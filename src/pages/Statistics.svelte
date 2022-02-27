<script lang="ts">
    import type { AnimalRead } from '../api';
    import { AnimalsService } from "../api";
    import { getAllEventTypes } from "./loaders/Events";
    import ChartJs from "../components/ChartJs.svelte";
    import { getMostFrequentHourFromDates, getTimeSpanStringFromMilliseconds } from "../utils/TimeUtils";
    import { getAverage, getMeanOfDifferences } from '../utils/NumberUtils';
    import { getAllEventTypesDataSets, getEventsInChosenPeriod, getLabels, getPoopRatingDataSets } from './loaders/Statistics';
    import { t } from '../translations';
import { time_ranges_to_array } from 'svelte/internal';

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
                        <option selected>{$t({ key: 'statistics.choose.an.animal' })}</option>
                        {#each animals as animal}
                            <option value={animal}>{animal.name}</option>
                        {/each}
                    </select>
                    <label for="currentAnimal">{$t({ key: 'animal' })}</label>
                </div>
                <div class="form-floating mt-2">
                    <select class="form-select" bind:value={days}>
                        <option value={1}>{$t({ key: 'today' })}</option>
                        <option value={7}>{$t({ key: 'statistics.last.n.days', substitutions: [7] })}</option>
                        <option value={14}>{$t({ key: 'statistics.last.n.days', substitutions: [14] })}</option>
                        <option value={30}>{$t({ key: 'statistics.last.n.days', substitutions: [30] })}</option>
                    </select>
                    <label for="days">Days</label>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12 col-md-6">
                <table class="table table-striped mt-2">
                    <thead>
                        <th>{$t({ key: 'event.type' })}</th>
                        <th>{$t({ key: 'total' })}</th>
                        <th>{$t({ key: 'statistics.table.header.average.rating' })}</th>
                        <th>{$t({ key: 'statistics.table.header.average.per.day' })}</th>
                        <th>{$t({ key: 'statistics.table.header.average.time.between.events' })}</th>
                        <th>{$t({ key: 'statistics.table.header.most.active.hours' })}</th>
                    </thead>
                    <tbody>
                        <!-- svelte-ignore missing-declaration -->
                        {#each eventTypes as et}
                            {@const eventsInChosenPeriod = getEventsInChosenPeriod(allEvents, et, days)}
                            {@const averageRating = getAverage(eventsInChosenPeriod.map(e => e.rating))}
                            {@const averageEvents = eventsInChosenPeriod.length / days}
                            {@const meanTimeBetweenEvents = getMeanOfDifferences(eventsInChosenPeriod.sort((a, b) => Date.parse(b.created) - Date.parse(a.created)).map(e => Date.parse(e.created)))}
                            <tr>
                                <td>{$t({ key: `event.type.${et.eventType.replace(' ', '.').toLowerCase()}` })}</td>
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
                        <button type="button" class="nav-link {activeTabId == "all-event-types" ? "active" : ""}">{$t({ key: 'all.event.types' })}</button>
                    </li>
                    <li class="nav-item" id="poop-rating-tab" on:click={() => activeTabId = "poop-rating"}>
                        <button type="button" class="nav-link {activeTabId == "poop-rating" ? "active" : ""}">{$t({ key: 'statistics.poop.rating' })}</button>
                    </li>
                </ul>
                <div class="tab-pane fade {activeTabId == "all-event-types" ? "d-block show" : "d-none"}" id="all-event-types" role="tabpanel" aria-labelledby="#all-event-types-tab">
                    <ChartJs title={$t({ key: 'events' })}
                            type="line"
                            x={$t({ key: 'date' })}
                            y={$t({ key: 'amount' })}
                            datasets={getAllEventTypesDataSets(days, currentAnimal?.events || animals.flatMap(foo => foo.events))}
                            labels={getLabels(days)} />
                </div>
                <div class="tab-pane fade {activeTabId == "poop-rating" ? "d-block show" : "d-none"}" id="poop-rating" role="tabpanel" aria-labelledby="#poop-rating-tab">
                    <ChartJs title={$t({ key: 'statistics.poop.rating' })}
                            type="line"
                            x={$t({ key: 'date' })}
                            y={$t({ key: 'rating' })}
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