<script lang="ts">
    import { onMount } from "svelte";
    import { type AnimalRead, type EventRead, AnimalsService, EventsService } from "../api";
    import { getAllEventTypes, getEventMarkers } from "../services/events";
    import { getCurrentPosition } from "../models/Position";
    import type { MapMouseEvent } from "mapbox-gl";
    import { addToast } from "../services/toasts";
    import Confirmation from "../components/Confirmation.svelte";
    import Map from "../components/Map.svelte";
    import Modal from "../components/Modal.svelte";
    import { getEnrichedEventType } from "../models/EnrichedEventType";
    import { getEventCreate } from "../factories/EventCreateFactory";

    let animals: Array<AnimalRead> = [];
    let confirmation: Confirmation;
    let events: Array<EventRead> = [];
    let eventTypes = getAllEventTypes();
    let map: Map;
    let modal: Modal;

    let eventCreate = getEventCreate();

    onMount(async () => {
        animals = await AnimalsService.getAllAnimalsGet();
        events = await EventsService.getAllEventsGet();
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
                        {#each eventTypes as eventType}
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
    <div class="row mt-2">
        <div class="col">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Animal</th>
                            <th>Type</th>
                            <th class="d-none d-md-table-cell">Latitude</th>
                            <th class="d-none d-md-table-cell">Longitude</th>
                            <th>Created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each events as event}
                            <tr>
                                <td class="align-middle">{event.animal_name}</td>
                                <td class="align-middle">
                                    <i class="fas {getEnrichedEventType(event.event_type).iconClass} fa-2x"></i>
                                </td>
                                <td class="align-middle d-none d-md-table-cell">{event.latitude}</td>
                                <td class="align-middle d-none d-md-table-cell">{event.longitude}</td>
                                <td class="align-middle">{new Date(Date.parse(event.created)).toLocaleString()}</td>
                                <td class="align-middle text-end">
                                    <button class="btn btn-lg btn-danger" on:click={() => handleOnClick(event.id)}>Remove</button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>