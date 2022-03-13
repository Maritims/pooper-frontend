<script lang="ts">
    import { getCssPostfix, getText, getTimeSpanForNextEvent, type EventButtonOptions } from "./loaders/EventButton";
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { EventsService } from "../api";
    import { addToast } from "../services/toasts";
    import Modal from "./Modal.svelte";
    import Rating from './Rating.svelte';
    import { t, type TranslationRequest } from "../translations";

    export let options: EventButtonOptions;

    let nextEventDueInHoursText: TranslationRequest = {
        key: 'event.button.due.now'
    };
    let cssClass = 'btn-event-danger';
    let isModalVisible = false;
    let rating = 0;
    const dispatch = createEventDispatcher();

    async function createEvent(): Promise<void> {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                await EventsService.createEventsPost({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    animal_id: options.animalId,
                    event_type: options.eventType.eventType,
                    rating: rating
                });
                addToast({
                    id: new Date().getTime(),
                    type: 'success',
                    body: $t({ key: 'event.button.success', substitutions: [options.eventType.eventType, options.animalName] }),
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
                    body: $t({ key: 'event.button.failure', substitutions: [options.eventType.eventType, options.animalName, error.message] }),
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
        const timeSpanForNextEvent = getTimeSpanForNextEvent(options.events, options.eventType);
        if(!timeSpanForNextEvent) return;

        nextEventDueInHoursText = getText(timeSpanForNextEvent.totalMilliseconds, options.eventType.intervalInMilliseconds);
        cssClass = `btn-${getCssPostfix(timeSpanForNextEvent.totalMilliseconds, options.eventType.intervalInMilliseconds)}`;
    });
</script>

{#if options.eventType.isRatingRequired}
    <Modal bind:isVisible={isModalVisible}>
        <span slot="title">Rate the event: {options.eventType.eventType}</span>
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

<button type="button" class="btn btn-lg {cssClass} {options.compact ? '' : 'w-100'}" on:click={async () => {
    if(options.eventType.isRatingRequired) isModalVisible = true;
    else await createEvent();
    }}>
    <i class="fas {options.eventType.iconClass} {options.compact ? '' : 'fa-2x'}"></i>
    <div class="d-none {options.compact ? 'd-sm-inline-block' : 'd-sm-block fs-3'}">{$t({ key: `event.type.${options.eventType.eventType.replace(' ', '.').toLowerCase()}`})}</div>
    <div class="d-none {options.compact ? '' : 'd-sm-block fs-6'}">{$t(nextEventDueInHoursText)}</div>
</button>