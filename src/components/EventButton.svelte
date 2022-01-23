<script lang="ts">
    import { createEventDispatcher, afterUpdate } from "svelte";
    import { AnimalRead, EventsService, EventType } from "../api";
    import { addToast } from "../services/toasts";
    import { getTimeSpanForNextEvent } from '../services/animals';
    import { getCssPostfix, getText } from "../models/TimeFunctions";
    import type { EnrichedEventType } from "../services/events";

    export let animal: AnimalRead;
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
        nextEventDueInHoursText = getText(timeSpanForNextEvent);
        cssClass = `btn-${getCssPostfix(timeSpanForNextEvent)}`;
    });
</script>

<button class="btn btn-lg {cssClass} w-100" on:click={handleOnClick}>
    <i class="fas {eventType.iconClass} fa-2x"></i>
    <div class="fs-3">{eventType.eventType}</div>
    <div class="fs-6 d-none d-sm-block">{nextEventDueInHoursText}</div>
</button>