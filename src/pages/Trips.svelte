<script lang="ts">
    import Map from '../components/Map.svelte';
    import Modal from "../components/Modal.svelte";
    import { getTimeSpanFromDateOrNumber, getTimeSpanString } from "../utils/TimeUtils";
    import { addRouteForEvents, getAllUnconfirmedTrips, getEventsInTrip, type Trip } from './loaders/Trips';
    import { getEventMarkers } from '../components/loaders/Map';
    import { onMount } from "svelte";
    import { EventsService, TripsService } from '../api';
    import { getDecodedToken } from '../services/auth';

    let activeTabId = 'new-trips';
    let selectedTrip: Trip | undefined;
    let trips: Array<Trip> = [];
    let homeLongitude: number;
    let homeLatitude: number;
    const user = getDecodedToken().user;

    onMount(async () => {
        homeLongitude = user.home_longitude!;
        homeLatitude = user.home_latitude!;
        const totalEventCount = await EventsService.getCountEventsCountGet(undefined, undefined, undefined, false);
        const events = await EventsService.getAllEventsGet(undefined, undefined, undefined, false, 0, totalEventCount);
        let eventsInTrips = getEventsInTrip(events,1000*60*60);
        trips = [{
            startTime: new Date(Date.parse(eventsInTrips[0].created)),
            stopTime: new Date(Date.parse(eventsInTrips[eventsInTrips.length - 1].created)),
            durationInMs: Date.parse(eventsInTrips[eventsInTrips.length - 1].created) - Date.parse(eventsInTrips[0].created),
            events: eventsInTrips
        }];
        trips = await getAllUnconfirmedTrips();
    });

    $: center = {
        lng: selectedTrip?.events?.length ? selectedTrip.events[0].longitude : 0,
        lat: selectedTrip?.events?.length ? selectedTrip.events[0].latitude : 0
    };
    $: isModalVisible = !!selectedTrip;
</script>

<Modal bind:isVisible={isModalVisible} isLarge={true}>
    <span slot="title">Review trip: {selectedTrip?.startTime.toLocaleString()}, {getTimeSpanString(getTimeSpanFromDateOrNumber(selectedTrip?.durationInMs || 0))}, {selectedTrip?.events?.length} events</span>
    <span slot="body">
        {#if isModalVisible && selectedTrip}
            <Map {center} markers={getEventMarkers(selectedTrip?.events || [])} on:load={(e) => addRouteForEvents(homeLongitude, homeLatitude, selectedTrip?.events || [], e.detail.target)} />
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Animal</th>
                        <th>Event type</th>
                        <th>Created</th>
                        <th>Coordinates</th>
                    </tr>
                </thead>
                <tbody>
                    {#each selectedTrip.events as event}
                    <tr>
                        <td>{event.animal_name}</td>
                        <td>{event.event_type}</td>
                        <td>{event.created}</td>
                        <td>{event.longitude}, {event.latitude}</td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </span>
    <span slot="footer">
        <button type="button" class="btn btn-success" on:click={async () => {
            if(!selectedTrip) return;
            await TripsService.createTripsPost({
                event_ids: selectedTrip.events.map(e => e.id)
            });
            trips = await getAllUnconfirmedTrips();
            selectedTrip = undefined;
        }}>Confirm</button>
        <button type="button" class="btn btn-danger" on:click={() => selectedTrip = undefined}>Cancel</button>
    </span>
</Modal>

<div class="container-fluid">
    <div class="row">
        <div class="col">
            <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" id="new-trips-tab" on:click={() => activeTabId = "new-trips"}>
                    <button type="button" class="nav-link {activeTabId == "new-trips" ? "active" : ""}">New trips</button>
                </li>
            </ul>
            <div class="tab-pane fade {activeTabId == "new-trips" ? "d-block show" : "d-none"}" id="new-trips" role="tabpanel" aria-labelledby="#new-trips-tab">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Start time</th>
                                <th>Stop time</th>
                                <th>Duration</th>
                                <th>Events</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each trips as trip}
                                <tr on:click={() => selectedTrip = trip} role="button">
                                    <td class="align-middle">{trip.startTime.toLocaleString()}</td>
                                    <td class="align-middle">{trip.stopTime.toLocaleString()}</td>
                                    <td class="align-middle">{getTimeSpanString(getTimeSpanFromDateOrNumber(trip.durationInMs))}</td>
                                    <td class="align-middle">{trip.events.length}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>