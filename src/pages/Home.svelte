<script lang="ts">
	import type { AnimalRead } from '../api';
	import type { Position } from '../models/Position';

	import { onMount } from "svelte";
	import { AnimalsService } from "../api";
	import { getAllEventTypes } from "./loaders/Events";
	import { getCurrentPosition } from "../models/Position";
	import EventButton from '../components/EventButton.svelte';
	import Map from '../components/Map.svelte';
	import Modal from '../components/Modal.svelte';
	import TripAlert from '../components/TripAlert.svelte';
	import { getEventMarkers } from '../components/loaders/Map';
	import { getAdditionalEventTypesCssClass } from './loaders/Home';
	import Accordion from '../components/Accordion.svelte';
	import AccordionItem from '../components/AccordionItem.svelte';
	import { getEventsInChosenPeriod } from './loaders/Statistics';
	import { t } from '../translations';
	import NoteModal from '../components/NoteModal.svelte';

	let animals: Array<AnimalRead> = [];
	let currentAnimal: AnimalRead | undefined;
	let eventTypes = getAllEventTypes();
	let idToInspect = 0;
	let position: Position | undefined = undefined;
	
	onMount(async () => animals = await AnimalsService.getAllAnimalsGet());

	async function handleOnDone(e: CustomEvent): Promise<void> {
		animals = e.detail.success ? (await AnimalsService.getAllAnimalsGet()) : [];
		currentAnimal = undefined;
	}

	$: isModalVisible = !!currentAnimal;
	$: animalToInspect = animals.find(animal => animal.id === idToInspect);
</script>


<Modal isVisible={isModalVisible}>
	<span slot="title">{$t({ key: 'home.additional.event.types' })}</span>
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
		<button type="button" class="btn btn-danger" on:click={() => isModalVisible = false}>{$t({ key: 'cancel' })}</button>
	</span>
</Modal>

<NoteModal bind:animal={animalToInspect}
    on:done={async () => animals = await AnimalsService.getAllAnimalsGet(false)}
    on:remove={async () => animals = await AnimalsService.getAllAnimalsGet(false)}
    on:cancel={() => idToInspect = 0}
/>

<div class="container-fluid">
	<div class="row mt-2">
		<TripAlert />

		{#each animals as animal}
			{@const division = animals.length > 1 ? 6 : 12}
			<div class="col-12 col-md-{division} {division == 12 ? '' : 'd-grid gap-2'} mb-2">
				<div class="card">
					<div class="card-body">
						<h5 class="align-middle align-items-center card-title d-flex justify-content-between">
							{animal.name}
							<div class="d-inline-block">
								<button class="btn btn-primary" on:click={() => idToInspect = animal.id}>
									<i class="fas fa-book"></i>
								</button>
								<button class="btn btn-{getAdditionalEventTypesCssClass(animal, eventTypes)}" on:click={() => currentAnimal = animal}>
									<i class="fas fa-plus"></i>
								</button>
							</div>
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
							<div class="row mt-2">
								<div class="col">
									<Accordion>
										<AccordionItem header={$t({ key: 'home.daily.summary.title' })}>
											<table class="table table-striped" slot="accordion-body">
												<thead>
													<tr>
														<th></th>
														<th class="text-center">{$t({ key: 'home.daily.summary.table.header.registered' })}</th>
														<th class="text-center">{$t({ key: 'home.daily.summary.table.header.expected' })}</th>
														<th class="text-center">{$t({ key: 'home.daily.summary.table.header.difference' })}</th>
													</tr>
												</thead>
												<tbody>
													{#each eventTypes as eventType}
														{@const todaysEvents = getEventsInChosenPeriod(animal.events, eventType, 1).length}
														{@const lastSevenDaysEvents = getEventsInChosenPeriod(animal.events, eventType, 7).length / 7}
														<tr>
															<td>
																<i class="fas {eventType.iconClass}"></i>
															</td>
															<td class="text-center">{todaysEvents}</td>
															<td class="text-center">{lastSevenDaysEvents.toFixed(0)}</td>
															<td class="text-center">{(todaysEvents - lastSevenDaysEvents).toFixed(0)}</td>
														</tr>
													{/each}
												</tbody>
											</table>
										</AccordionItem>
									</Accordion> 
								</div>
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
				<button class="btn btn-lg btn-primary" on:click={async () => position = await getCurrentPosition()}>{$t({ key: 'load.map' })}</button>
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