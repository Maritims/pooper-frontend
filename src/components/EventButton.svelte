<script lang="ts">
    import type { EnrichedEventType } from "../models/EnrichedEventType";
    import { getCssPostfix, getText, getTimeSpanForNextEvent } from "./loaders/EventButton";
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { EventsService, type AnimalRead } from "../api";
    import { addToast } from "../services/toasts";
    import Modal from "./Modal.svelte";
    import Rating from './Rating.svelte';
    import { t, type TranslationRequest } from "../translations";

    export let animal: AnimalRead;
    export let compact = false;
    export let eventType: EnrichedEventType;

    let nextEventDueInHoursText: TranslationRequest = {
        key: 'event.button.due.now'
    };
    let cssClass = 'btn-danger';
    let isModalVisible = false;
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
                    body: $t({ key: 'event.button.success', substitutions: [eventType.eventType, animal.name] }),
                    durationInMs: 3000
                });
                dispatch('done', {
                    success: true
                });
                isModalVisible = false;
                rating = 0;
            },
            error => {
                addToast({
                    id: new Date().getTime(),
                    type: 'danger',
                    body: $t({ key: 'event.button.failure', substitutions: [eventType.eventType, animal.name, error.message] }),
                    durationInMs: 3000
                });
                dispatch('done', {
                    success: false
                });
                isModalVisible = false;
                rating = 0;
            }
        );
    }

    afterUpdate(() => {
        const timeSpanForNextEvent = getTimeSpanForNextEvent(animal, eventType);
        if(!timeSpanForNextEvent) return;

        nextEventDueInHoursText = getText(timeSpanForNextEvent.totalMilliseconds, eventType.intervalInMilliseconds);
        cssClass = `btn-${getCssPostfix(timeSpanForNextEvent.totalMilliseconds, eventType.intervalInMilliseconds)}`;
    });
</script>

{#if eventType.isRatingRequired}
    <Modal bind:isVisible={isModalVisible}>
        <span slot="title">Rate the event: {eventType.eventType}</span>
        <div class="row mb-2" slot="body">
            <div class="col">
                <Rating bind:rating isEditable={true} />
            </div>
        </div>
        <span slot="footer">
            <button type="button" class="btn btn-danger" on:click={() => isModalVisible = false}>{$t({ key: 'cancel' })}</button>
            <button type="submit" class="btn btn-success" on:click={() => createEvent()}>{$t({ key: 'submit' })}</button>
        </span>
    </Modal>
{/if}

<button type="button" class="btn btn-lg btn-event {cssClass} {compact ? '' : 'w-100'}" on:click={async () => {
    if(eventType.isRatingRequired) isModalVisible = true;
    else await createEvent();
    }}>
    <i class="fas {eventType.iconClass} {compact ? '' : 'fa-2x'}"></i>
    <div class="d-none {compact ? 'd-sm-inline-block' : 'd-sm-block fs-3'}">{$t({ key: `event.type.${eventType.eventType.replace(' ', '.').toLowerCase()}`})}</div>
    <div class="d-none {compact ? '' : 'd-sm-block fs-6'}">{$t(nextEventDueInHoursText)}</div>
</button>