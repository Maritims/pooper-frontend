<script lang="ts">
    import { onMount } from 'svelte';
    import { AnimalsService, type AnimalCreate, type AnimalRead } from '../api';
    import Confirmation from '../components/Confirmation.svelte';
    import RemoveButton from '../components/RemoveButton.svelte';
    import { getAnimalCreate } from '../factories/AnimalFactory';
    import EditButton from '../components/EditButton.svelte';
    import { t } from '../translations';
    import { getNoteCreate } from '../factories/NoteFactory';
    import NoteModal from '../components/NoteModal.svelte';
    import EditAnimalModal from '../components/EditAnimalModal.svelte';
    import { getLogger, LogLevel } from '../services/logger';

    let animals: Array<AnimalRead> = [];
    let idToEdit: number | undefined;
    let idToInspect: number | undefined;
    let idToRemove: number | undefined;
    let animalCreate: AnimalCreate | undefined;
    let noteCreate = getNoteCreate();

    const includeDeactivated = true;
    const log = getLogger({
        context: 'Animals',
        level: LogLevel.ERROR
    });

    onMount(async () => animals = await AnimalsService.getAllAnimalsAnimalsGet(includeDeactivated));

    async function handleOnSubmit(): Promise<void> {
        if(!animalCreate) {
            log.error('Encountered form submission without data');
            return;
        }

        if(idToEdit) {
            await AnimalsService.updateAnimalAnimalsIdPut(idToEdit, animalCreate);
        } else {
            await AnimalsService.createAnimalAnimalsPost(animalCreate);
        }
        animals = await AnimalsService.getAllAnimalsAnimalsGet(includeDeactivated);
        animalCreate = undefined;
        idToEdit = undefined;
    }

    async function handleOnConfirm(): Promise<void> {
        await AnimalsService.deleteAnimalAnimalsIdDelete(idToRemove!);
        animals = await AnimalsService.getAllAnimalsAnimalsGet(includeDeactivated);
        idToRemove = undefined;
    }

    $: isConfirmationVisible = !!idToRemove;
    $: animalToInspect = animals.find(animal => animal.id == idToInspect);
</script>

<Confirmation bind:isVisible={isConfirmationVisible} on:confirm={handleOnConfirm} on:cancel={() => idToRemove = undefined}/>

<EditAnimalModal bind:animal={animalCreate} on:submit={handleOnSubmit} />

<NoteModal bind:animal={animalToInspect}
    on:done={async () => animals = await AnimalsService.getAllAnimalsAnimalsGet(includeDeactivated)}
    on:remove={async () => animals = await AnimalsService.getAllAnimalsAnimalsGet(includeDeactivated)}
    on:cancel={() => idToInspect = undefined}
/>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <button type="button" class="btn btn-primary" on:click={() => animalCreate = getAnimalCreate()}>{$t({ key: 'animals.create.animal' })}</button>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>{$t({ key: 'animals.table.header.name' })}</th>
                            <th>{$t({ key: 'animals.table.header.deactivated' })}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each animals as animal}
                            <tr>
                                <td class="align-middle">{animal.name}</td>
                                <td class="align-middle">{$t({ key: animal.is_deactivated?.toYesNo()?.toLowerCase() || 'no' })}</td>
                                <td class="align-middle text-end">
                                    <button class="btn btn-primary" on:click={() => {
                                        idToInspect = animal.id;
                                        noteCreate.animal_id = idToInspect;
                                    }}>
                                        <i class="fas fa-book"></i>
                                        <span class="d-none d-md-inline">&nbsp;{$t({ key: 'animals.view.notes' })}</span>
                                    </button>
                                    <EditButton id={animal.id} on:click={() => {
                                        animalCreate = {
                                            name: animal.name,
                                            is_deactivated: animal.is_deactivated,
                                            condition_types_to_track: animal.tracked_condition_types.map(trackedConditionType => trackedConditionType.condition_type),
                                            event_types_to_track: animal.tracked_event_types.map(trackedEventType => trackedEventType.event_type)
                                        };
                                        idToEdit = animal.id;
                                    }} />
                                    <RemoveButton id={animal.id} on:click={() => idToRemove = animal.id} />
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>