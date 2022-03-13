<script lang="ts">
	import { ConditionsService, EventsService, type AnimalRead, type ConditionRead, type EventRead } from '../api';

	import { onMount } from "svelte";
	import { AnimalsService } from "../api";
	import EventButton from '../components/EventButton.svelte';
	import Modal from '../components/Modal.svelte';
	import TripAlert from '../components/TripAlert.svelte';
	import { getAdditionalEventTypesCssClass } from './loaders/Home';
	import Accordion from '../components/Accordion.svelte';
	import AccordionItem from '../components/AccordionItem.svelte';
	import { getEventsInChosenPeriod } from './loaders/Statistics';
	import { t } from '../translations';
	import NoteModal from '../components/NoteModal.svelte';
	import { getEnrichedEventType } from '../models/EnrichedEventType';
	import ConditionSwitch from '../components/ConditionSwitch.svelte';

	let animals: Array<AnimalRead> = [];
	let conditions: Array<ConditionRead> = [];
	let events: Array<EventRead> = [];
	let currentAnimal: AnimalRead | undefined;
	let idToInspect: number | undefined;

	async function loadData() {
		animals = await AnimalsService.getAllAnimalsGet();
		conditions = await ConditionsService.getAllConditionsGet(animals.map(a => a.id));
		events = await EventsService.getAllEventsGet(animals.map(a => a.id), undefined, undefined, false, undefined, undefined, 'desc');
	}
	
	onMount(async () => loadData());

	async function handleOnDone(e: CustomEvent): Promise<void> {
		if(e.detail.success) await loadData();
		currentAnimal = undefined;
	}

	$: isModalVisible = !!currentAnimal;
	$: animalToInspect = idToInspect ? animals.find(animal => animal.id === idToInspect) : undefined;
</script>


<Modal isVisible={isModalVisible}>
	<span slot="title">{$t({ key: 'home.additional.event.types' })}</span>
	<div slot="body" class="container-fluid p-0">
		{#if currentAnimal}
			{#if currentAnimal.tracked_event_types.length > 0}
				{#each currentAnimal.tracked_event_types as animalEventTypeAssociation}
					{@const eventType = getEnrichedEventType(animalEventTypeAssociation.event_type)}
					{#if !eventType.showOnHomeScreen && currentAnimal}
						<div class="row mb-2">
							<div class="col">
								<EventButton options={{
									animalId: currentAnimal.id,
									animalName: currentAnimal.name,
									compact: false,
									eventType: eventType,
									events: events.filter(e => e.animal_id == currentAnimal?.id)
								}} on:done={handleOnDone} />
							</div>
						</div>
					{/if}
				{/each}
			{:else}
				<div class="row mb-2">
					<div class="col">{$t({ key: 'home.no.additional.event.types', substitutions: [currentAnimal.name] })}</div>
				</div>
			{/if}
		{/if}
	</div>
	<span slot="footer">
		<button type="button" class="btn btn-danger" on:click={() => isModalVisible = false}>{$t({ key: 'cancel' })}</button>
	</span>
</Modal>

<NoteModal animal={animalToInspect}
	on:done={async () => await loadData()}
	on:remove={async () => await loadData()}
	on:cancel={() => idToInspect = 0}
/>

<div class="container-fluid px-sm-4">
	<div class="row mt-2">
		<TripAlert {events} />

		{#each animals as animal}
			{@const division = animals.length > 1 ? 6 : 12}
			<div class="col-12 col-md-{division} {division == 12 ? '' : 'd-grid gap-2'} mb-4">
				<div class="card">
					<div class="card-body">
						<h5 class="align-middle align-items-center card-title d-flex justify-content-between">
							{animal.name}
							<div class="d-inline-block">
								{#if animal.tracked_condition_types.length > 0}
									{#each animal.tracked_condition_types as animalConditionTypeAssociation}
										<ConditionSwitch options={{
											animalId: animal.id,
											animalHasCondition: conditions.find(c => c.animal_id == animal.id && c.condition_type == animalConditionTypeAssociation.condition_type)?.is_enabled || false,
											conditionType: animalConditionTypeAssociation.condition_type
										}} />
									{/each}
								{/if}
								<button class="btn btn-primary" on:click={() => idToInspect = animal.id}>
									<i class="fas fa-book"></i>
								</button>
								<button class="btn btn-primary btn-{getAdditionalEventTypesCssClass(events.filter(e => e.animal_id == animal.id))}" on:click={() => currentAnimal = animal}>
									<i class="fas fa-plus"></i>
								</button>
							</div>
						</h5>
						<div class="container-fluid p-0">
							{#if animal.tracked_event_types.length > 0}
								<div class="row">
									{#each animal.tracked_event_types as animalEventTypeAssociation}
										{@const eventType = getEnrichedEventType(animalEventTypeAssociation.event_type)}
										{#if eventType.showOnHomeScreen}
											<div class="col">
												<EventButton options={{
													animalId: animal.id,
													animalName: animal.name,
													compact: false,
													eventType: eventType,
													events: events.filter(e => e.animal_id == animal.id)
												}} on:done={handleOnDone} />
											</div>
										{/if}
									{/each}
								</div>
								<div class="row mt-2">
									<div class="col">
										<Accordion>
											<AccordionItem header={$t({ key: 'home.daily.summary.title' })}>
												<table class="table table-striped">
													<thead>
														<tr>
															<th></th>
															<th class="text-center">{$t({ key: 'home.daily.summary.table.header.registered' })}</th>
															<th class="text-center">{$t({ key: 'home.daily.summary.table.header.expected' })}</th>
															<th class="text-center">{$t({ key: 'home.daily.summary.table.header.difference' })}</th>
														</tr>
													</thead>
													<tbody>
														{#each animal.tracked_event_types as animalEventTypeAssociation}
															{@const eventType = getEnrichedEventType(animalEventTypeAssociation.event_type)}
															{@const todaysEvents = getEventsInChosenPeriod(animal.tracked_events, eventType, 1).length}
															{@const lastSevenDaysEvents = getEventsInChosenPeriod(animal.tracked_events, eventType, 7).length / 7}
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
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/each}
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