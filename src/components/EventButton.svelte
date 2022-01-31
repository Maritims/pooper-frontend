<script lang="ts">
    import type { EnrichedEventType } from "../models/EnrichedEventType";
    import { getCssPostfix, getText, getTimeSpanForNextEvent } from "./EventButton";
    import { createEventDispatcher, afterUpdate } from "svelte";
    import { EventsService, type AnimalRead } from "../api";
    import { addToast } from "../services/toasts";

    export let animal: AnimalRead;
    export let compact = false;
    export let eventType: EnrichedEventType;

    let nextEventDueInHoursText = 'Due now';
    let cssClass = 'btn-danger';

    const dispatch = createEventDispatcher();

    const handleOnClick = async () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                await EventsService.createEventsPost({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    animal_id: animal.id,
                    event_type: eventType.eventType
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

<button type="button" class="btn btn-lg btn-event {cssClass} {compact ? '' : 'w-100'}" on:click={handleOnClick}>
    <i class="fas {eventType.iconClass} {compact ? '' : 'fa-2x'}"></i>
    <div class="d-none {compact ? 'd-sm-inline-block' : 'd-sm-block fs-3'}">{eventType.eventType}</div>
    <div class="d-none {compact ? '' : 'd-sm-block fs-6'}">{nextEventDueInHoursText}</div>
</button>