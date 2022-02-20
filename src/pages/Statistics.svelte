<script lang="ts">
    import type { AnimalRead } from '../api';
    import { AnimalsService } from "../api";
    import { getAllEventTypes } from "./loaders/Events";
    import ChartJs from "../components/ChartJs.svelte";
    import { getMostFrequentHourFromDates, getTimeSpanFromDatePair, getTimeSpanStringFromMilliseconds, isToday } from "../utils/TimeUtils";
    import { getAverage, getMeanOfDifferences } from '../utils/NumberUtils';
    import { getAllEventTypesDataSets, getLabels, getPoopRatingDataSets } from './loaders/Statistics';

    let currentAnimal: AnimalRead;
    let days = 7;
    let activeTabId: string = 'all-event-types';
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
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item" id="all-event-types-tab" on:click={() => activeTabId = "all-event-types"}>
                        <button type="button" class="nav-link {activeTabId == "all-event-types" ? "active" : ""}">All event types</button>
                    </li>
                    <li class="nav-item" id="poop-rating-tab" on:click={() => activeTabId = "poop-rating"}>
                        <button type="button" class="nav-link {activeTabId == "poop-rating" ? "active" : ""}">Poop rating</button>
                    </li>
                </ul>
                <div class="tab-pane fade {activeTabId == "all-event-types" ? "d-block show" : "d-none"}" id="all-event-types" role="tabpanel" aria-labelledby="#all-event-types-tab">
                    <ChartJs title="Events"
                            type="line"
                            x="Date"
                            y="Amount"
                            datasets={getAllEventTypesDataSets(days, currentAnimal?.events || animals.flatMap(foo => foo.events))}
                            labels={getLabels(days)} />
                </div>
                <div class="tab-pane fade {activeTabId == "poop-rating" ? "d-block show" : "d-none"}" id="poop-rating" role="tabpanel" aria-labelledby="#poop-rating-tab">
                    <ChartJs title="Poop rating"
                            type="line"
                            x="Date"
                            y="Rating"
                            yMin={0}
                            yMax={5}
                            yStep={1}
                            datasets={getPoopRatingDataSets(days, currentAnimal?.events || animals.flatMap(foo => foo.events), currentAnimal?.events ? 1 : animals.length)}
                            labels={getLabels(days)}
                        />
                </div>
            </div>
        </div>
    {/await}
</div>