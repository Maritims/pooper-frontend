<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { EventsService, type AnimalRead, type EventRead } from "../api";
    import { getEnrichedEventType } from "../models/EnrichedEventType";
    import EventButton from "./EventButton.svelte";
    import Modal from "./Modal.svelte";
    import { t } from '../translations';

    export let animal: AnimalRead | undefined;
    export let events: Array<EventRead> = [];
    export let isVisible = false;
    const dispatch = createEventDispatcher();

    $: if(animal) EventsService.getAllEventsGet([animal.id], undefined, 1, undefined, 0, 10, undefined).then(eventReads => events = eventReads);
    $: isVisible = !!animal;
</script>

<Modal bind:isVisible={isVisible}>
	<span slot="title">{$t({ key: 'home.additional.event.types' })}</span>
	<div slot="body" class="container-fluid p-0">
		{#if animal && animal.tracked_event_types.length > 0}
			{#if animal.tracked_event_types.length > 0}
				{#each animal.tracked_event_types as animalEventTypeAssociation}
					{@const eventType = getEnrichedEventType(animalEventTypeAssociation.event_type)}
					{#if !eventType.showOnHomeScreen}
						<div class="row mb-2">
							<div class="col">
								<EventButton options={{
									animalId: animal.id,
									animalName: animal.name,
									compact: false,
									eventType: eventType,
									events: events
								}} on:done={() => dispatch('done')} />
							</div>
						</div>
					{/if}
				{/each}
			{:else}
				<div class="row mb-2">
					<div class="col">{$t({ key: 'home.no.additional.event.types', substitutions: [animal.name] })}</div>
				</div>
			{/if}
		{/if}
	</div>
	<span slot="footer">
		<button type="button" class="btn btn-danger" on:click={() => {
			events = [];
			dispatch('cancel');
		}}>{$t({ key: 'cancel' })}</button>
	</span>
</Modal>