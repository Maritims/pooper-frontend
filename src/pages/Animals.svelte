<script lang="ts">
    import { onMount } from 'svelte';
    import { AnimalsService, type AnimalCreate, type AnimalRead } from '../api';
    import Modal from '../components/Modal.svelte';
    import Confirmation from '../components/Confirmation.svelte';
    import RemoveButton from '../components/RemoveButton.svelte';
    import { getAnimalCreate } from '../factories/AnimalFactory';
    import EditButton from '../components/EditButton.svelte';

    let animals: Array<AnimalRead> = [];
    let isModalVisible = false;
    let idToEdit: number | undefined;
    let idToRemove: number | undefined;
    let animalCreate: AnimalCreate = getAnimalCreate();

    const includeDeactivated = true;

    onMount(async () => animals = await AnimalsService.getAllAnimalsGet(includeDeactivated));

    async function handleOnSubmit(): Promise<void> {
        if(idToEdit) {
            await AnimalsService.updateAnimalsIdPut(idToEdit, animalCreate);
        } else {
            await AnimalsService.createAnimalsPost(animalCreate);
        }
        animals = await AnimalsService.getAllAnimalsGet();
        animalCreate = getAnimalCreate();
        idToEdit = undefined;
        isModalVisible = false;
    }

    $: isConfirmationVisible = !!idToRemove;
</script>

<Confirmation bind:isVisible={isConfirmationVisible} on:confirm={async () => {
    await AnimalsService.deleteAnimalsIdDelete(idToRemove);
    animals = await AnimalsService.getAllAnimalsGet();
    idToRemove = undefined;
}} on:cancel={() => idToRemove = undefined}/>

<Modal bind:isVisible={isModalVisible}>
    <span slot="title">Create new animal</span>
    <form slot="body" on:submit|preventDefault={handleOnSubmit}>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="text" class="form-control" id="newAnimalName" bind:value={animalCreate.name} />
                    <label for="newAnimalName">Name</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="isDeactivated" bind:checked={animalCreate.is_deactivated}>
                    <label class="form-check-label" for="isDeactivated">Deactivate</label>
                </div>
            </div>
        </div>
    </form>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => {
            animalCreate = getAnimalCreate();
            isModalVisible = false;
        }}>Cancel</button>
        <button type="submit" class="btn btn-success" on:click={handleOnSubmit}>Submit</button>
    </span>
</Modal>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <button type="button" class="btn btn-lg btn-success" on:click={() => isModalVisible = true}>Create animal</button>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Deactivated</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each animals as animal}
                            <tr>
                                <td class="align-middle">{animal.name}</td>
                                <td class="align-middle">{animal.is_deactivated?.toYesNo()}</td>
                                <td class="align-middle text-end">
                                    <EditButton id={animal.id} on:click={() => {
                                        animalCreate = animal;
                                        idToEdit = animal.id;
                                        isModalVisible = true;
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