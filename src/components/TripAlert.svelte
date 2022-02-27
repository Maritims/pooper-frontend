<script lang="ts">
    import { getAllUnconfirmedTrips } from "../pages/loaders/Trips";
import { t } from "../translations";
</script>

{#await getAllUnconfirmedTrips() then trips}
    <div class="col-12">
        <div class="alert alert-primary">{@html $t({ key: 'trip.alert', substitutions: [trips.length] })}</div>
    </div>
    <!--{trips.map(trip => `${trip.date}: ${trip.events.length}, ${getTimeSpanString(getTimeSpanFromDateOrNumber(trip.durationInMs))}`)}-->
{/await}