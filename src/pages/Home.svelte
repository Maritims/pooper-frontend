<script lang="ts">
	import { AnimalRead, AnimalsService } from "../api";
	import EventButton from '../components/EventButton.svelte';
	import Map, { MapLocation } from '../components/Map.svelte';
	import { onMount } from 'svelte';
	import { getAllEventTypes } from "../services/events";
import { accessToken } from "mapbox-gl";

	let animals = [];
	let eventTypes = getAllEventTypes();

    onMount(async () => animals = await AnimalsService.getAllAnimalsGet());

	async function handleOnDone(e: CustomEvent): Promise<void> {
		if(!e.detail.success) return;
		animals = await AnimalsService.getAllAnimalsGet();
	};

	let division = 12;
	$: if(animals.length > 1) division = 6;
</script>


<div class="container-fluid">
	<div class="row mt-2">
		{#each animals as animal}
			<div class="col-12 col-sm-{division} {division == 12 ? '' : 'd-grid gap-2'} mb-2">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">{animal.name}</h5>
						<div class="container-fluid p-0">
							<div class="row">
								{#each eventTypes as eventType}
									<div class="col">
										<EventButton {animal} {eventType} on:done={handleOnDone} />
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<Map accessToken={globalThis['mapboxAccessToken']} minHeightPx={600} events={animals.flatMap(animal => animal.events)} />

<style lang="scss">
	.card-body {
		.col:nth-child(2) {
			padding-right:0;
			padding-left:0;
		}
	}
</style>