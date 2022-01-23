<script lang="ts">
    import { onMount } from "svelte";
    import { EventRead, EventsService } from "../api";
    import { getEnrichedEventType } from "../services/events";
    import Confirmation from "../components/Confirmation.svelte";

    let confirmation: Confirmation;
    let events: Array<EventRead> = [];

    onMount(async () => events = await EventsService.getAllEventsGet());

    function handleOnClick(id: number): void {
        confirmation.confirm(async () => {
            await EventsService.deleteEventsIdDelete(id);
            events = await EventsService.getAllEventsGet();
        });
    };
</script>

<Confirmation bind:this={confirmation} />

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Animal</th>
                            <th>Type</th>
                            <th class="d-none d-md-table-cell">Latitude</th>
                            <th class="d-none d-md-table-cell">Longitude</th>
                            <th>Created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each events as event}
                            <tr>
                                <td class="align-middle">{event.animal_name}</td>
                                <td class="align-middle">
                                    <i class="fas {getEnrichedEventType(event.event_type).iconClass} fa-2x"></i>
                                </td>
                                <td class="align-middle d-none d-md-table-cell">{event.latitude}</td>
                                <td class="align-middle d-none d-md-table-cell">{event.longitude}</td>
                                <td class="align-middle">{event.created}</td>
                                <td class="align-middle text-end">
                                    <button class="btn btn-lg btn-danger" on:click={() => handleOnClick(event.id)}>Remove</button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>