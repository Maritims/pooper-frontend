<script lang="ts">
	import { onMount } from "svelte";
	import { AnimalRead, AnimalsService } from "../api";
	import EventButton from '../components/EventButton.svelte';
	import Map from '../components/Map.svelte';
	import { getAllEventTypes, getEventMarkers } from "../services/events";
	import { getCurrentPosition } from "../services/navigation";

	let animals: Array<AnimalRead> = [];
	let eventTypes = getAllEventTypes();
	let map: Map;
	
	onMount(async () => {
		animals = await AnimalsService.getAllAnimalsGet();
	});

	async function handleOnDone(e: CustomEvent): Promise<void> {
		if(!e.detail.success) return;
		animals = await AnimalsService.getAllAnimalsGet();
	};
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
</div>

{#if animals.length}
	{#await getCurrentPosition() then position}
		<Map minHeightPx={600} center={position} markers={getEventMarkers(animals.flatMap(animal => animal.events))} />
	{/await}
{/if}

<style lang="scss">
	.card-body {
		.col:nth-child(2) {
			padding-right:0;
			padding-left:0;
		}
	}
</style>