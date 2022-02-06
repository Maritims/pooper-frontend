<script lang="ts">
    import type { EnrichedEventType } from "../models/EnrichedEventType";
    import { getCssPostfix, getText, getTimeSpanForNextEvent } from "./EventButton";
    import { createEventDispatcher, afterUpdate } from "svelte";
    import { EventsService, type AnimalRead } from "../api";
    import { addToast } from "../services/toasts";
    import Modal from "./Modal.svelte";
    import Rating from './Rating.svelte';

    export let animal: AnimalRead;
    export let compact = false;
    export let eventType: EnrichedEventType;

    let nextEventDueInHoursText = 'Due now';
    let cssClass = 'btn-danger';
    let modal: Modal;
    let rating = 0;

    const dispatch = createEventDispatcher();

    async function createEvent(): Promise<void> {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                await EventsService.createEventsPost({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    animal_id: animal.id,
                    event_type: eventType.eventType,
                    rating: rating
                });
                addToast({
                    id: new Date().getTime(),
                    type: 'success',
                    body: `Successfully registered event '${eventType.eventType}' for ${animal.name}`,
                    durationInMs: 3000
                });
                dispatch('done', {
                    success: true
                });
                modal?.hide();
                rating = 0;
            },
            error => {
                addToast({
                    id: new Date().getTime(),
                    type: 'danger',
                    body: `Failed to register event '${eventType.eventType} for ${animal.name}: ${error}`,
                    durationInMs: 3000
                });
                dispatch('done', {
                    success: false
                });
                modal?.hide();
                rating = 0;
            }
        );
    }

    async function handleOnClick(): Promise<void> {
        if(eventType.isRatingRequired) modal.show();
        else await createEvent();
    }

    afterUpdate(() => {
        const timeSpanForNextEvent = getTimeSpanForNextEvent(animal, eventType);
        if(!timeSpanForNextEvent) return;

        nextEventDueInHoursText = getText(timeSpanForNextEvent.totalMilliseconds, eventType.intervalInMilliseconds);
        cssClass = `btn-${getCssPostfix(timeSpanForNextEvent.totalMilliseconds, eventType.intervalInMilliseconds)}`;
    });
</script>

{#if eventType.isRatingRequired}
    <Modal bind:this={modal}>
        <span slot="title">Rate the event: {eventType.eventType}</span>
        <div class="row mb-2" slot="body">
            <div class="col">
                <Rating bind:rating isEditable={true} />
            </div>
        </div>
        <span slot="footer">
            <button type="button" class="btn btn-danger" on:click={modal.hide}>Cancel</button>
            <button type="submit" class="btn btn-success" on:click={() => createEvent()}>Submit</button>
        </span>
    </Modal>
{/if}

<button type="button" class="btn btn-lg btn-event {cssClass} {compact ? '' : 'w-100'}" on:click={handleOnClick}>
    <i class="fas {eventType.iconClass} {compact ? '' : 'fa-2x'}"></i>
    <div class="d-none {compact ? 'd-sm-inline-block' : 'd-sm-block fs-3'}">{eventType.eventType}</div>
    <div class="d-none {compact ? '' : 'd-sm-block fs-6'}">{nextEventDueInHoursText}</div>
</button>