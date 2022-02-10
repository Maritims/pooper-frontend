<script lang="ts">
    import type { AnimalRead } from '../api';
    import { AnimalsService } from "../api";
    import { getAllEventTypes } from "../services/events";
    import ChartJs from "../components/ChartJs.svelte";
    import { getMostFrequentHourFromDates, getTimeSpanFromDatePair, getTimeSpanStringFromMilliseconds, isToday } from "../utils/TimeUtils";
    import { getAverage, getMeanOfDifferences } from '../utils/NumberUtils';

    let currentAnimal: AnimalRead;
    let days = 7;
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
                <ChartJs events={currentAnimal?.events || animals.flatMap(animal => animal.events)} days={days} />
            </div>
        </div>
    {/await}
</div>