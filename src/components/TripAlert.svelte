<script lang="ts">
    import { getAllUnconfirmedTrips } from "../pages/loaders/Trips";
</script>

{#await getAllUnconfirmedTrips() then trips}
    <div class="col-12">
        <div class="alert alert-primary">There are <a href="/trips" class="alert-link">{trips.length} new trips</a> to confirm.</div>
    </div>
    <!--{trips.map(trip => `${trip.date}: ${trip.events.length}, ${getTimeSpanString(getTimeSpanFromDateOrNumber(trip.durationInMs))}`)}-->
{/await}