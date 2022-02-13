<script lang="ts">
    import { EventsService } from "../api";
    import Modal from "../components/Modal.svelte";
    import { getTimeSpanFromDateOrNumber, getTimeSpanString } from "../utils/TimeUtils";
    import { getTripsFromEvents } from "../utils/TripUtils";
    import Map from '../components/Map.svelte';
    import type { Trip } from "../models/Trip";
    import { getDecodedToken } from "../services/auth";
    import { getEventMarkers } from '../services/events';
    import Tabs from "../components/tabs/Tabs.svelte";
    import Tab from "../components/tabs/Tab.svelte";

    let activeTabId = 'new-trips';
    let isVisible = false;
    let map: Map;
    let selectedTrip: Trip;

    function reviewTrip(trip: Trip) {
        selectedTrip = trip;
        isVisible = true;
    }

    function addRoute() {
        const user = getDecodedToken().user;
        map.addRoute([{
            lng: user.home_longitude,
            lat: user.home_latitude
        }, ...selectedTrip.events.map(e => {
            return {
                lng: e.longitude,
                lat: e.latitude
            }
        }), {
            lng: user.home_longitude,
            lat: user.home_latitude
        }]);
    }

    $: center = {
        lng: selectedTrip?.events?.length ? selectedTrip.events[0].longitude : 0,
        lat: selectedTrip?.events?.length ? selectedTrip.events[0].latitude : 0
    };
</script>

<Modal bind:isVisible isLarge={true}>
    <span slot="title">Review trip</span>
    <span slot="body">
        {#if isVisible}
            <Map bind:this={map} {center} markers={getEventMarkers(selectedTrip.events)} on:load={addRoute} />
        {/if}
    </span>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => isVisible = false}>Cancel</button>
    </span>
</Modal>

<Tabs tabButtons={[{
    id: 'new-trips',
    title: 'New trips'
}, {
    id: 'existing-trips',
    title: 'Existing trips'
}]} bind:activeTabId>
    <Tab id="new-trips" show={activeTabId == 'new-trips'}>
        {#await EventsService.getCountEventsCountGet(undefined, undefined, undefined, false) then count}
            <div class="container-fluid">
                {#await EventsService.getAllEventsGet(undefined, undefined, undefined, false, 0, count) then events}
                    <div class="align-items-center bg-dark mt-2 py-2 row text-light">
                        <div class="col">Start time</div>
                        <div class="col">Stop time</div>
                        <div class="col">Duration</div>
                        <div class="col">Events</div>
                    </div>
                    {@const trips = getTripsFromEvents(events, 1000 * 60 * 5, 1000 * 60 * 10)}
                    {#each trips as trip}
                        <div class="align-items-center bg-odd-colored pt-2 pb-2 row" on:click={() => reviewTrip(trip)} role="button">
                            <div class="col">{trip.startTime.toLocaleString()}</div>
                            <div class="col">{trip.stopTime.toLocaleString()}</div>
                            <div class="col">{getTimeSpanString(getTimeSpanFromDateOrNumber(trip.durationInMs))}</div>
                            <div class="col">{trip.events.length}</div>
                        </div>
                    {/each}
                {/await}
            </div>
        {/await}
    </Tab>
    <Tab id="existing-trips" show={activeTabId == 'existing-trips'}>
        Hello World!
    </Tab>
</Tabs>

<style lang="scss">
    .row.bg-odd-colored {
        &:nth-child(odd) {
            background: rgba(0, 0, 0, 0.05);
        }
    }
</style>