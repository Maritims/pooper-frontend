<script lang="ts">
	import { EventType, type AnimalRead } from '../api';
	import type { Position } from '../models/Position';

	import { onMount } from "svelte";
	import { AnimalsService } from "../api";
	import { getAllEventTypes, getEventMarkers } from "../services/events";
	import { getCurrentPosition } from "../models/Position";
	import EventButton from '../components/EventButton.svelte';
	import Map from '../components/Map.svelte';
	import Modal from '../components/Modal.svelte';
	import { getTimeSpanForNextEvent } from '../components/EventButton';

	let animals: Array<AnimalRead> = [];
	let currentAnimal: AnimalRead | undefined;
	let eventTypes = getAllEventTypes();
	let modal: Modal;
	let position: Position | undefined = undefined;
	
	onMount(async () => animals = await AnimalsService.getAllAnimalsGet());

	async function handleOnDone(e: CustomEvent): Promise<void> {
		animals = e.detail.success ? (await AnimalsService.getAllAnimalsGet()) : [];
		currentAnimal = undefined;
		modal.hide();
	}
	const loadMap = async () => position = await getCurrentPosition();
	function showModal(animal: AnimalRead): void {
		currentAnimal = animal;
		modal.show();
	}

	function getAdditionalEventTypesCssClass(animal: AnimalRead): string {
		for(let i = 0; i < eventTypes.length; i++) {
			if(eventTypes[i].showOnHomeScreen) continue;
			
			const timeSpanForNextEvent = getTimeSpanForNextEvent(animal, eventTypes[i]);
			if(!timeSpanForNextEvent || timeSpanForNextEvent.totalMilliseconds > eventTypes[i].intervalInMilliseconds) return 'danger';
			if((timeSpanForNextEvent.totalMilliseconds / eventTypes[i].intervalInMilliseconds) >= 0.75) return 'warning';
		}

		return 'success';
	}
</script>


<Modal bind:this={modal}>
	<span slot="title">Additional event types</span>
	<div slot="body" class="container-fluid p-0">
		{#each eventTypes as eventType}
			{#if !eventType.showOnHomeScreen && currentAnimal}
				<div class="row mb-2">
					<div class="col">
						<EventButton animal={currentAnimal} {eventType} on:done={handleOnDone} />
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<span slot="footer">
		<button type="button" class="btn btn-danger" on:click={modal.hide}>Cancel</button>
	</span>
</Modal>

<div class="container-fluid">
	<div class="row mt-2">
		{#each animals as animal}
			{@const division = animals.length > 1 ? 6 : 12}
			<div class="col-12 col-sm-{division} {division == 12 ? '' : 'd-grid gap-2'} mb-2">
				<div class="card">
					<div class="card-body">
						<h5 class="align-middle align-items-center card-title d-flex justify-content-between">
							{animal.name}
							<button class="btn btn-{getAdditionalEventTypesCssClass(animal)}" on:click={() => showModal(animal)}>
								<i class="fas fa-plus"></i>
							</button>
						</h5>
						<div class="container-fluid p-0">
							<div class="row">
								{#each eventTypes as eventType}
									{#if eventType.showOnHomeScreen}
										<div class="col">
											<EventButton {animal} {eventType} on:done={handleOnDone} />
										</div>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<div class="row mt-2">
		<div class="col text-center">
			{#if position}
				<Map minHeightPx={600} center={position} markers={getEventMarkers(animals.flatMap(animal => animal.events))} />
			{:else}
				<button class="btn btn-lg btn-primary" on:click={loadMap}>Load map</button>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.card-body {
		.col:nth-child(2) {
			padding-right:0;
			padding-left:0;
		}
	}
</style>