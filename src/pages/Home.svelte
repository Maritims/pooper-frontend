<script lang="ts">
	import { onMount } from "svelte";
	import type { AnimalRead } from '../api';
	import { AnimalsService } from "../api";
	import EventButton from '../components/EventButton.svelte';
	import Map from '../components/Map.svelte';
	import { getAllEventTypes, getEventMarkers } from "../services/events";
	import type { Position } from '../models/Position';
	import { getCurrentPosition } from "../models/Position";

	let animals: Array<AnimalRead> = [];
	let eventTypes = getAllEventTypes();
	let map: Map;
	let position: Position = undefined;
	
	onMount(async () => {
		animals = await AnimalsService.getAllAnimalsGet();
	});

	async function handleOnDone(e: CustomEvent): Promise<void> {
		if(!e.detail.success) return;
		animals = await AnimalsService.getAllAnimalsGet();
	};

	async function loadMap(): Promise<void> {
		position = await getCurrentPosition();
	}
</script>


<div class="container-fluid">
	<div class="row mt-2">
		{#each animals as animal}
			{@const division = animals.length > 1 ? 6 : 12}
			<div class="col-12 col-sm-{division} {division == 12 ? '' : 'd-grid gap-2'} mb-2">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">{animal.name}</h5>
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