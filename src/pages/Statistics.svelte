<script lang="ts">
    import { AnimalRead, AnimalsService, EventRead, EventType } from "../api";
    import { EnrichedEventType, getAllEventTypes } from "../services/events";
    import ChartJs from "../components/ChartJs.svelte";
    import { onMount } from "svelte";

    let animals: Array<AnimalRead> = [];
    let currentAnimal: AnimalRead;
    let days = 7;
    let eventTypes: Array<EnrichedEventType> = getAllEventTypes();

    onMount(async () => {
        animals = await AnimalsService.getAllAnimalsGet();
    });

    function getEvents() {
        return currentAnimal?.events || animals.flatMap(animal => animal.events);
    }

    function getAverageEvents(events: Array<EventRead>, eventType: EventType): number {
        if(!events?.length) return 0;

        const dates = events
        .filter(event => event.event_type === eventType)
        .reduce((accumulator, event: EventRead) => {
            if(event.event_type !== eventType) return accumulator;

            const date = new Date(Date.parse(event.created)).toDateString();
            if(!accumulator[date]) accumulator[date] = 0;
            
            accumulator[date]++;
            return accumulator;
        }, {});

        const dateCount = Object.keys(dates).length;
        return dateCount > 0 ? getEvents().length / dateCount : 0;
    };
</script>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col col-sm-4">
            <div class="form-floating">
                <select class="form-select" id="currentAnimal" bind:value={currentAnimal}>
                    <option selected>Choose an animal</option>
                    {#each animals as animal}
                        <option value={animal}>{animal.name}</option>
                    {/each}
                </select>
                <label for="currentAnimal">Animal</label>
            </div>
        </div>
        <div class="col col-sm-4">
            <div class="form-floating">
                <select class="form-select" bind:value={days}>
                    <option value={7}>Last 7 days</option>
                    <option value={14}>Last 14 days</option>
                    <option value={30}>Last 30 days</option>
                </select>
                <label for="days">Days</label>
            </div>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col">
            <div class="card card-body">
                <h5 class="card-title">Average events per day</h5>
                <ul>
                    {#each eventTypes as eventType}
                        <li>{eventType.eventType}: {getAverageEvents(currentAnimal?.events || animals.flatMap(animal => animal.events), eventType.eventType)}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</div>

<ChartJs events={currentAnimal?.events || animals.flatMap(animal => animal.events)} days={days} />