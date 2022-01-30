<script lang="ts">
    import type { AnimalRead } from '../api';
    import { AnimalsService } from "../api";
    import { getAllEventTypes } from "../services/events";
    import ChartJs from "../components/ChartJs.svelte";
    import { getTimeSpan } from "../models/TimeSpan";

    let currentAnimal: AnimalRead;
    let days = 7;
</script>

<div class="container-fluid">
    {#await AnimalsService.getAllAnimalsGet() then animals}
        {@const allEvents = currentAnimal?.events || animals.flatMap(a => a.events)}
        {@const eventTypes = getAllEventTypes()}

        <div class="row mt-2">
            <div class="col-12 col-md-6">
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
                        <option value={7}>Last 7 days</option>
                        <option value={14}>Last 14 days</option>
                        <option value={30}>Last 30 days</option>
                    </select>
                    <label for="days">Days</label>
                </div>
                <ChartJs events={currentAnimal?.events || animals.flatMap(animal => animal.events)} days={days} />
            </div>
            <div class="col-12 col-md-6">
                <table class="table table-striped mt-2">
                    <thead>
                        <th>Event type</th>
                        <th>Total</th>
                        <th>Average per day</th>
                    </thead>
                    <tbody>
                        {#each eventTypes as et}
                            {@const eventsInChosenPeriod = allEvents.filter(e => e.event_type == et.eventType && getTimeSpan(new Date().getTime(), Date.parse(e.created)).totalDays <= days)}
                            {@const averageEvents = eventsInChosenPeriod.length / days}
                            <tr>
                                <td>{et.eventType}</td>
                                <td>{eventsInChosenPeriod.length}</td>
                                <td>{averageEvents}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/await}
</div>