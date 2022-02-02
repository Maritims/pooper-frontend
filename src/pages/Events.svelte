<script lang="ts">
    import { onMount } from "svelte";
    import { type AnimalRead, type EventRead, AnimalsService, EventsService, EventType } from "../api";
    import { getAllEventTypes, getEventMarkers } from "../services/events";
    import { getCurrentPosition } from "../models/Position";
    import type { MapMouseEvent } from "mapbox-gl";
    import { addToast } from "../services/toasts";
    import Confirmation from "../components/Confirmation.svelte";
    import Map from "../components/Map.svelte";
    import Modal from "../components/Modal.svelte";
    import { getEnrichedEventType } from "../models/EnrichedEventType";
    import { getEventCreate } from "../factories/EventCreateFactory";
    import { getTimeSpanFromDatePair } from "../utils/TimeUtils";
import Pagination from "../components/Pagination.svelte";

    let animals: Array<AnimalRead> = [];
    let confirmation: Confirmation;
    let days = [1, 7, 14, 30];
    let eventCreate = getEventCreate();
    let events: Array<EventRead> = [];
    let enrichedEventTypes = getAllEventTypes();
    let map: Map;
    let modal: Modal;

    let currentPageNumber = 0;
    const pageSize = 10;
    let totalEventCount = 0;

    let filterByAnimal: AnimalRead;
    let filterByDays: number;
    let filterByEventType: EventType;

    const firstColumnClass = 'col-4 col-sm-4 col-md-3 col-xxl-2';
    const secondColumnClass = firstColumnClass;
    const thirdColumnClass = 'col col-md-3 col-xxl-2 d-none d-md-block';
    const fourthColumnClass = 'col-4 col-md-3 col-xxl-6 text-end';

    onMount(async () => {
        animals = await AnimalsService.getAllAnimalsGet();
        totalEventCount = await EventsService.getCountEventsCountGet();
    });

    function handleOnClick(id: number): void {
        confirmation.confirm(async () => {
            await EventsService.deleteEventsIdDelete(id);
            events = await EventsService.getAllEventsGet();
        });
    };

    function handleOnMapClick(e: CustomEvent<MapMouseEvent>): void {
        map.setCenter(e.detail.lngLat);
        eventCreate.longitude = e.detail.lngLat.lng;
        eventCreate.latitude = e.detail.lngLat.lat;
    }

    async function createEvent(): Promise<void> {
        const event = await EventsService.createEventsPost(eventCreate);
        events = await EventsService.getAllEventsGet();
        eventCreate = getEventCreate();
        modal.hide();
        addToast({
            id: new Date().getTime(),
            type: 'success',
            body: `Successfully registered event '${event.event_type}' for ${event.animal_name}`,
            durationInMs: 3000
        });
    }

    $: EventsService.getAllEventsGet(currentPageNumber, pageSize).then((newEvents) => events = newEvents);
    $: filteredEvents = events
        .filter(event => !filterByAnimal || event.animal_id === filterByAnimal.id)
        .filter(event => !filterByDays || getTimeSpanFromDatePair({
            latest: new Date(),
            earliest: new Date(Date.parse(event.created))
        }).totalDays <= filterByDays)
        .filter(event => !filterByEventType || event.event_type === filterByEventType);
</script>

<Confirmation bind:this={confirmation} />

<Modal bind:this={modal}>
    <span slot="title">Create new event</span>
    <form slot="body" on:submit|preventDefault={createEvent}>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <select class="form-select" id="animal" bind:value={eventCreate.animal_id}>
                        <option>Choose animal</option>
                        {#each animals as animal}
                            <option value={animal.id}>{animal.name}</option>
                        {/each}
                    </select>
                    <label for="animal">Animal</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <select class="form-select" id="eventType" bind:value={eventCreate.event_type}>
                        <option>Choose event type</option>
                        {#each enrichedEventTypes as eventType}
                            <option value={eventType.eventType}>{eventType.eventType}</option>
                        {/each}
                    </select>
                    <label for="eventType">Event type</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="text" class="form-control" id="longitude" bind:value={eventCreate.longitude} readonly />
                    <label for="longitude">Longitude</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="text" class="form-control" bind:value={eventCreate.latitude} readonly />
                    <label for="latitude">Latitude</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            {#await getCurrentPosition() then position}
                <Map bind:this={map} on:click={handleOnMapClick} center={position} markers={getEventMarkers(events)} />
            {/await}
        </div>
    </form>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={modal.hide}>Cancel</button>
        <button type="submit" class="btn btn-success" on:click={createEvent}>Submit</button>
    </span>
</Modal>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <button type="button" class="btn btn-lg btn-success" on:click={modal.show}>Create event</button>
        </div>
    </div>
    <div class="bg-dark mt-2 py-2 row text-light">
        <div class={firstColumnClass}>Animal</div>
        <div class={secondColumnClass}>Event type</div>
        <div class={thirdColumnClass}>Created</div>
        <div class={fourthColumnClass}></div>
    </div>
    <div class="row bg-dark py-2">
        <div class={firstColumnClass}>
            <select class="form-select" id="filterByAnimal" bind:value={filterByAnimal}>
                <option value="" selected>Filter</option>
                {#each animals as animal}
                    <option value={animal}>{animal.name}</option>
                {/each}
            </select>
        </div>
        <div class={secondColumnClass}>
            <select class="form-select" id="filterByEventType" bind:value={filterByEventType}>
                <option value="" selected>Filter</option>
                {#each enrichedEventTypes as enrichedEventType}
                    <option value={enrichedEventType.eventType}>{enrichedEventType.eventType}</option>
                {/each}
            </select>
        </div>
        <div class={thirdColumnClass}>
            <select class="form-select" id="filterByDays" bind:value={filterByDays}>
                <option value="" selected>Filter</option>
                {#each days as day}
                    <option value={day}>Last {day} days</option>
                {/each}
            </select>
        </div>
        <div class={fourthColumnClass}></div>
    </div>
    {#each filteredEvents as event}
        <div class="align-items-center bg-odd-colored p-2 row">
            <div class={firstColumnClass}>{event.animal_name}</div>
            <div class={secondColumnClass}>
                <i class="fas {getEnrichedEventType(event.event_type).iconClass} fa-2x"></i>
            </div>
            <div class={thirdColumnClass}>{new Date(Date.parse(event.created)).toLocaleString()}</div>
            <div class={fourthColumnClass}>
                <button class="btn btn-lg btn-danger" on:click={() => handleOnClick(event.id)}>
                    <i class="fas fa-trash"></i><span class="d-none d-md-inline">&nbsp;Remove</span>
                </button>
            </div>
        </div>
    {/each}
    <div class="row mt-2">
        <div class="col">
            <Pagination currentPageNumber={currentPageNumber} pageSize={10} totalCount={totalEventCount} on:changePage={(e) => currentPageNumber = e.detail} />
        </div>
    </div>
</div>

<style lang="scss">
    .row.bg-odd-colored {
        &:nth-child(odd) {
            background: rgba(0, 0, 0, 0.05);
        }
    }
</style>