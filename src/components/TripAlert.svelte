<script lang="ts">
    import type { EventRead } from "../api";

    import { getTripsFromEvents } from "../pages/loaders/Trips";
    import { t } from "../translations";

    export let events: Array<EventRead>;

    $: trips = getTripsFromEvents(events, 1000 * 60 * 5, 1000 * 60 * 10);
</script>

<div class="col-12">
    <div class="alert alert-primary">{@html $t({ key: 'trip.alert', substitutions: [trips.length] })}</div>
</div>
<!--{trips.map(trip => `${trip.date}: ${trip.events.length}, ${getTimeSpanString(getTimeSpanFromDateOrNumber(trip.durationInMs))}`)}-->