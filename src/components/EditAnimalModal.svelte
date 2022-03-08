<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { ConditionType, type AnimalCreate, type EventType } from "../api";
    import { getEventTypes } from "../pages/loaders/Events";
    import { t } from "../translations";
    import Modal from "./Modal.svelte";

    export let animal: AnimalCreate | undefined;

    const dispatch = createEventDispatcher();

    function trackConditionType(e: Event) {
        if(!animal) return;

        const target = e.target as HTMLInputElement;
        const conditionType = target.value as ConditionType;
        const i = animal.condition_types_to_track.indexOf(conditionType);
        if(i === -1) {
            animal.condition_types_to_track.push(conditionType);
        } else {
            animal.condition_types_to_track.splice(i, 1);
        }
    }

    function trackEventType(e: Event) {
        if(!animal) return;

        const target = e.target as HTMLInputElement;
        const eventType = target.value as EventType;
        const i = animal.event_types_to_track.indexOf(eventType);
        if(i === -1) {
            animal.event_types_to_track.push(eventType);
        } else {
            animal.event_types_to_track.splice(i, 1);
        }
    }

    $: isVisible = !!animal;
</script>

<Modal {isVisible}>
    <span slot="title">Create new animal</span>
    <form slot="body" on:submit|preventDefault={() => dispatch('submit')}>
        {#if animal}
            <div class="row mb-2">
                <div class="col">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="newAnimalName" bind:value={animal.name} />
                        <label for="newAnimalName">{$t({ key: 'animals.new.animal.name' })}</label>
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="isDeactivated" bind:checked={animal.is_deactivated}>
                        <label class="form-check-label" for="isDeactivated">{$t({ key: 'animals.deactivate.animal'})}</label>
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12">
                    <h5>{$t({ key: 'animals.track.event.types' })}</h5>
                </div>
                {#each getEventTypes() as eventType}
                    <div class="col-6">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="trackEventType_{eventType}" value={eventType}
                                checked={animal.event_types_to_track?.indexOf(eventType) > -1} on:change={trackEventType}>
                            <label class="form-check-label" for="trackEventType_{eventType}">{$t({ key: `event.type.${eventType.replace(' ', '.').toLowerCase()}` })}</label>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="row mb-2">
                <div class="col-12">
                    <h5>{$t({ key: 'animals.track.conditions' })}</h5>
                </div>
                {#each Object.values(ConditionType) as conditionType}
                    <div class="col-6">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="trackConditionType_{conditionType}" value={conditionType}
                                checked={animal.condition_types_to_track?.indexOf(conditionType) > -1} on:change={trackConditionType}>
                            <label class="form-check-label" for="trackConditionType_{conditionType}">{$t({ key: `condition.type.${conditionType.replace(' ', '.').toLowerCase()}.label` })}</label>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </form>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => animal = undefined}>{$t({ key: 'cancel' })}</button>
        <button type="submit" class="btn btn-success" on:click={() => dispatch('submit')}>{$t({ key: 'submit' })}</button>
    </span>
</Modal>