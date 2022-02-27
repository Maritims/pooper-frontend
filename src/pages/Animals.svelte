<script lang="ts">
    import { onMount } from 'svelte';
    import { AnimalsService, type AnimalCreate, type AnimalRead } from '../api';
    import Modal from '../components/Modal.svelte';
    import Confirmation from '../components/Confirmation.svelte';
    import RemoveButton from '../components/RemoveButton.svelte';
    import { getAnimalCreate } from '../factories/AnimalFactory';
    import EditButton from '../components/EditButton.svelte';
    import { t } from '../translations';
    import { getNoteCreate } from '../factories/NoteFactory';
    import NoteModal from '../components/NoteModal.svelte';

    let animals: Array<AnimalRead> = [];
    let isCreateModalVisible = false;
    let idToEdit: number | undefined;
    let idToInspect: number | undefined;
    let idToRemove: number | undefined;
    let animalCreate: AnimalCreate = getAnimalCreate();
    let noteCreate = getNoteCreate();

    const includeDeactivated = true;

    onMount(async () => animals = await AnimalsService.getAllAnimalsGet(includeDeactivated));

    async function handleOnSubmit(): Promise<void> {
        if(idToEdit) {
            await AnimalsService.updateAnimalsIdPut(idToEdit, animalCreate);
        } else {
            await AnimalsService.createAnimalsPost(animalCreate);
        }
        animals = await AnimalsService.getAllAnimalsGet(includeDeactivated);
        animalCreate = getAnimalCreate();
        idToEdit = undefined;
        isCreateModalVisible = false;
    }

    $: isConfirmationVisible = !!idToRemove;
    $: animalToInspect = animals.find(animal => animal.id == idToInspect);
</script>

<Confirmation bind:isVisible={isConfirmationVisible} on:confirm={async () => {
    await AnimalsService.deleteAnimalsIdDelete(idToRemove);
    animals = await AnimalsService.getAllAnimalsGet(includeDeactivated);
    idToRemove = undefined;
}} on:cancel={() => idToRemove = undefined}/>

<Modal bind:isVisible={isCreateModalVisible}>
    <span slot="title">Create new animal</span>
    <form slot="body" on:submit|preventDefault={handleOnSubmit}>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="text" class="form-control" id="newAnimalName" bind:value={animalCreate.name} />
                    <label for="newAnimalName">{$t({ key: 'animals.new.animal.name' })}</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="isDeactivated" bind:checked={animalCreate.is_deactivated}>
                    <label class="form-check-label" for="isDeactivated">{$t({ key: 'animals.deactivate.animal'})}</label>
                </div>
            </div>
        </div>
    </form>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => {
            animalCreate = getAnimalCreate();
            isCreateModalVisible = false;
        }}>{$t({ key: 'cancel' })}</button>
        <button type="submit" class="btn btn-success" on:click={handleOnSubmit}>{$t({ key: 'submit' })}</button>
    </span>
</Modal>

<NoteModal bind:animal={animalToInspect}
    on:done={async () => animals = await AnimalsService.getAllAnimalsGet(includeDeactivated)}
    on:remove={async () => animals = await AnimalsService.getAllAnimalsGet(includeDeactivated)}
    on:cancel={() => idToInspect = undefined}
/>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <button type="button" class="btn btn-lg btn-success" on:click={() => isCreateModalVisible = true}>{$t({ key: 'animals.create.animal' })}</button>
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
                                    <button class="btn btn-lg btn-info" on:click={() => {
                                        idToInspect = animal.id;
                                        noteCreate.animal_id = idToInspect;
                                    }}>
                                        <i class="fas fa-book"></i>
                                        <span class="d-none d-md-inline">&nbsp;{$t({ key: 'animals.view.notes' })}</span>
                                    </button>
                                    <EditButton id={animal.id} on:click={() => {
                                        animalCreate = animal;
                                        idToEdit = animal.id;
                                        isCreateModalVisible = true;
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