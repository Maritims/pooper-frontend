<script lang="ts">
    import type { EventRead } from "../api";
    import { getTripsFromEvents } from "../utils/TripUtils";
    
    export let events: Array<EventRead>;
    export let estimatedMsBeforeFirstEvent: number;
    export let estimatedMsAfterLastEvent: number;

    $: trips = getTripsFromEvents(events, estimatedMsBeforeFirstEvent, estimatedMsAfterLastEvent);
</script>

{#if trips?.length}
    <div class="col-12">
        <div class="alert alert-primary">There are <a href="#" class="alert-link">{trips.length} new trips</a> to confirm.</div>
    </div>
    <!--{trips.map(trip => `${trip.date}: ${trip.events.length}, ${getTimeSpanString(getTimeSpanFromDateOrNumber(trip.durationInMs))}`)}-->
{/if}