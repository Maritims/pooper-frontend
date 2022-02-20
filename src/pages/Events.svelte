<script lang="ts">
    import { onMount } from "svelte";
    import { type AnimalRead, type EventRead, AnimalsService, EventsService, EventType } from "../api";
    import { getAllEventTypes } from "./loaders/Events";
    import { getCurrentPosition, type Position } from "../models/Position";
    import { addToast } from "../services/toasts";
    import Confirmation from "../components/Confirmation.svelte";
    import Map from "../components/Map.svelte";
    import { getEventMarkers } from '../components/loaders/Map';
    import Modal from "../components/Modal.svelte";
    import { getEnrichedEventType } from "../models/EnrichedEventType";
    import { getEventCreate } from "../factories/EventCreateFactory";
    import Pagination from "../components/table/Pagination.svelte";
    import DropdownFilter from "../components/table/DropdownFilter.svelte";
    import Rating from "../components/Rating.svelte";
    import { firstColumnClass, secondColumnClass, thirdColumnClass, fourthColumnClass } from "./loaders/Events";
    import RemoveButton from "../components/RemoveButton.svelte";

    let animals: Array<AnimalRead> = [];
    let idToRemove: number | undefined;
    let days = [1, 7, 14, 30];
    let eventCreate = getEventCreate();
    let events: Array<EventRead> = [];
    let enrichedEventTypes = getAllEventTypes();
    let map: Map;
    let isModalVisible = false;
    let position: Position;

    let currentPageNumber = 0;
    const pageSize = 10;
    let totalEventCount = 0;

    let filterByAnimal: AnimalRead | undefined;
    let filterByEventType: EventType | undefined;
    let filterByDays: number | undefined;
    let animalFilter: DropdownFilter;
    let eventTypeFilter: DropdownFilter;
    let daysFilter: DropdownFilter;

    onMount(async () => {
        animals = await AnimalsService.getAllAnimalsGet();
    });

    async function createEvent(): Promise<void> {
        const event = await EventsService.createEventsPost(eventCreate);
        events = await EventsService.getAllEventsGet();
        eventCreate = getEventCreate();
        isModalVisible = false;
        addToast({
            id: new Date().getTime(),
            type: 'success',
            body: `Successfully registered event '${event.event_type}' for ${event.animal_name}`,
            durationInMs: 3000
        });
    }

    function resetFilters() {
        animalFilter.reset();
        eventTypeFilter.reset();
        daysFilter.reset();
    }

    $: EventsService.getAllEventsGet(
        filterByAnimal?.id,
        filterByEventType || undefined,
        filterByDays || undefined,
        undefined,
        currentPageNumber, pageSize
        ).then((newEvents) => events = newEvents);
    $: EventsService.getCountEventsCountGet(
        filterByAnimal?.id,
        filterByEventType || undefined,
        filterByDays || undefined
        ).then((count) => totalEventCount = count);
    $: isRatingRequired = enrichedEventTypes.find(enrichedEventType => enrichedEventType.eventType === eventCreate.event_type)?.isRatingRequired;
    $: eventCreate.rating = enrichedEventTypes.find(enrichedEventType => enrichedEventType.eventType === eventCreate.event_type)?.isRatingRequired ? eventCreate.rating : 0;
    $: isConfirmationVisible = !!idToRemove;
</script>

<Confirmation bind:isVisible={isConfirmationVisible} on:confirm={async () => {
    await EventsService.deleteEventsIdDelete(idToRemove);
    events = await EventsService.getAllEventsGet();
    idToRemove = undefined;
}} on:cancel={() => idToRemove = undefined}/>

<Modal isVisible={isModalVisible}>
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
            <div class="col">
                <div class="form-floating">
                    <input type="datetime-local" class="form-control" bind:value={eventCreate.created} />
                    <label for="created">Created</label>
                </div>
            </div>
        </div>
        {#if isRatingRequired}
            <div class="row mb-2">
                <div class="col">
                    <Rating bind:rating={eventCreate.rating} label="Rating" />
                </div>
            </div>
        {/if}
        <div class="row mb-2">
            {#if position}
				<Map bind:this={map} on:click={(e) => {
                    map.setCenter(e.detail.lngLat);
                    eventCreate.longitude = e.detail.lngLat.lng;
                    eventCreate.latitude = e.detail.lngLat.lat;
                }} center={position} markers={getEventMarkers(animals.flatMap(animal => animal.events))} />
			{:else}
				<button type="button" class="btn btn-lg btn-primary" on:click={async () => position = await getCurrentPosition()}>Load map</button>
			{/if}
        </div>
    </form>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => isModalVisible = false}>Cancel</button>
        <button type="submit" class="btn btn-success" on:click={createEvent}>Submit</button>
    </span>
</Modal>

<div class="container-fluid">
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-lg btn-success" on:click={() => isModalVisible = true}>Create event</button>
        </div>
    </div>
    <div class="align-items-center bg-dark mt-2 pt-2 row text-light">
        <div class={firstColumnClass}>Animal</div>
        <div class={secondColumnClass}>Event type</div>
        <div class={thirdColumnClass}>Created</div>
        <div class={fourthColumnClass}></div>
    </div>
    <div class="align-items-center row bg-dark py-2">
        <div class={firstColumnClass}>
            <DropdownFilter bind:this={animalFilter} bind:selectedOption={filterByAnimal} options={animals.map(animal => {
                return {
                    description: animal.name,
                    value: animal
                }
            })} />
        </div>
        <div class={secondColumnClass}>
            <DropdownFilter bind:this={eventTypeFilter} bind:selectedOption={filterByEventType} options={enrichedEventTypes.map(enrichedEventType => {
                return {
                    description: enrichedEventType.eventType,
                    value: enrichedEventType.eventType
                }
            })} />
        </div>
        <div class={thirdColumnClass}>
            <DropdownFilter bind:this={daysFilter} bind:selectedOption={filterByDays} options={days.map(day => {
                return {
                    description: day == 1 ? 'Today' : `Last ${day.toString()} days`,
                    value: day
                }
            })} />
        </div>
        <div class={fourthColumnClass}>
            <button class="btn btn-lg btn-danger" on:click={() => resetFilters()}>
                <i class="fas fa-undo"></i><span class="d-none d-md-inline">&nbsp;Reset</span>
            </button>
        </div>
    </div>
    {#each events as event}
        <div class="align-items-center bg-odd-colored pt-2 pb-2 row">
            <div class={firstColumnClass}>{event.animal_name}</div>
            <div class={secondColumnClass}>
                <i class="fas {getEnrichedEventType(event.event_type).iconClass} fa-2x"></i>
            </div>
            <div class={thirdColumnClass}>{new Date(Date.parse(event.created)).toLocaleString()}</div>
            <div class={fourthColumnClass}>
                <RemoveButton id={event.id} on:click={() => idToRemove = event.id} />
            </div>
        </div>
    {/each}
    <div class="row mt-2">
        <div class="col">
            <Pagination bind:currentPageNumber pageSize={10} bind:totalCount={totalEventCount} />
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