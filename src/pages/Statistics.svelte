<script lang="ts">
    import type { AnimalRead } from '../api';
    import { AnimalsService } from "../api";
    import { getAllEventTypes, getAllEventTypesDataSets, getLabels, getPoopRatingDataSets } from "../services/events";
    import ChartJs from "../components/ChartJs.svelte";
    import { getMostFrequentHourFromDates, getTimeSpanFromDatePair, getTimeSpanStringFromMilliseconds, isToday } from "../utils/TimeUtils";
    import { getAverage, getMeanOfDifferences } from '../utils/NumberUtils';
    import Tabs from '../components/tabs/Tabs.svelte';
    import Tab from '../components/tabs/Tab.svelte';

    let currentAnimal: AnimalRead;
    let days = 7;
    let tabButtons = [{
        id: 'allEventTypes',
        title: 'All event types'
    }, {
        id: 'poopRating',
        title: 'Poop rating'
    }];
    let activeTabId: string = 'allEventTypes';
</script>

<div class="container-fluid">
    {#await AnimalsService.getAllAnimalsGet() then animals}
        {@const allEvents = currentAnimal?.events || animals.flatMap(a => a.events)}
        {@const eventTypes = getAllEventTypes()}

        <div class="row mt-2">
            <div class="col">
                <div class="form-floating">
                    <select class="form-select" id="currentAnimal" bind:value={currentAnimal}>
                        <option selected>Choose an animal</option>
                        {#each animals as animal}
                            <option value={animal}>{animal.name}</option>
                        {/each}
                    </select>
                    <label for="currentAnimal">Animal</label>
                </div>
                <div class="form-floating mt-2">
                    <select class="form-select" bind:value={days}>
                        <option value={1}>Today</option>
                        <option value={7}>Last 7 days</option>
                        <option value={14}>Last 14 days</option>
                        <option value={30}>Last 30 days</option>
                    </select>
                    <label for="days">Days</label>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12 col-md-6">
                <table class="table table-striped mt-2">
                    <thead>
                        <th>Event type</th>
                        <th>Total</th>
                        <th>Average rating</th>
                        <th>Average per day</th>
                        <th>Average time between events</th>
                        <th>Most active hours</th>
                    </thead>
                    <tbody>
                        <!-- svelte-ignore missing-declaration -->
                        {#each eventTypes as et}
                            {@const eventsInChosenPeriod = allEvents.filter(e => {
                                if(e.event_type != et.eventType) return false;
                                if(days == 1) return isToday(Date.parse(e.created));
                                return getTimeSpanFromDatePair({
                                    latest: new Date(),
                                    earliest: new Date(Date.parse(e.created))
                                }).totalDays <= days;
                            })}
                            {@const averageRating = getAverage(eventsInChosenPeriod.map(e => e.rating))}
                            {@const averageEvents = eventsInChosenPeriod.length / days}
                            {@const meanTimeBetweenEvents = getMeanOfDifferences(eventsInChosenPeriod.sort((a, b) => Date.parse(b.created) - Date.parse(a.created)).map(e => Date.parse(e.created)))}
                            <tr>
                                <td>{et.eventType}</td>
                                <td>{eventsInChosenPeriod.length}</td>
                                <td>{averageRating?.toFixed(2) || ''}</td>
                                <td>{averageEvents.toFixed(2)}</td>
                                <td>{getTimeSpanStringFromMilliseconds(meanTimeBetweenEvents)}</td>
                                <td>{getMostFrequentHourFromDates(eventsInChosenPeriod.map(event => new Date(Date.parse(event.created)))) || ''}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="col-12 col-md-6">
                <Tabs {tabButtons} bind:activeTabId={activeTabId}>
                    <Tab id="allEventTypes" show={activeTabId == 'allEventTypes'}>
                        <ChartJs title="Events"
                            type="line"
                            x="Date"
                            y="Amount"
                            datasets={getAllEventTypesDataSets(days, currentAnimal?.events || animals.flatMap(foo => foo.events))}
                            labels={getLabels(7)} />
                    </Tab>
                    <Tab id="poopRating" show={activeTabId == 'poopRating'}>
                        <ChartJs title="Poop rating"
                            type="line"
                            x="Date"
                            y="Rating"
                            yMin={0}
                            yMax={5}
                            yStep={1}
                            annotations={[{
                                type: 'box',
                                xMin: 0,
                                xMax: 6,
                                yMin: 1,
                                yMax: 1,
                                borderColor: '#ff4545',
                                borderWidth: 4
                            }, {
                                type: 'box',
                                xMin: 0,
                                xMax: 6,
                                yMin: 2,
                                yMax: 2,
                                borderColor: '#ffa534',
                                borderWidth: 4
                            }, {
                                type: 'box',
                                xMin: 0,
                                xMax: 6,
                                yMin: 3,
                                yMax: 3,
                                borderColor: '#ffe234',
                                borderWidth: 4
                            },
                            {
                                type: 'box',
                                xMin: 0,
                                xMax: 6,
                                yMin: 4,
                                yMax: 4,
                                borderColor: '#57e32c',
                                borderWidth: 4
                            }]}
                            datasets={getPoopRatingDataSets(days, currentAnimal?.events || animals.flatMap(foo => foo.events), currentAnimal?.events ? 1 : animals.length)}
                            labels={getLabels(7)}
                        />
                    </Tab>
                </Tabs>
            </div>
        </div>
    {/await}
</div>