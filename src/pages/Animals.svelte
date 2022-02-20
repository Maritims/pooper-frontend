<script lang="ts">
    import { onMount } from 'svelte';
    import { AnimalsService, type AnimalRead } from '../api';
    import Modal from '../components/Modal.svelte';
    import Confirmation from '../components/Confirmation.svelte';
import RemoveButton from '../components/RemoveButton.svelte';

    let animals: Array<AnimalRead> = [];
    let isModalVisible = false;
    let idToRemove: number | undefined;
    let newAnimalName: string;

    onMount(async () => animals = await AnimalsService.getAllAnimalsGet());

    async function handleOnSubmit(): Promise<void> {
        await AnimalsService.createAnimalsPost({
            name: newAnimalName
        });
        newAnimalName = '';
        animals = await AnimalsService.getAllAnimalsGet();
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
                    <input type="text" class="form-control" id="newAnimalName" bind:value={newAnimalName} />
                    <label for="newAnimalName">Name</label>
                </div>
            </div>
        </div>
    </form>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => isModalVisible = false}>Cancel</button>
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
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each animals as animal}
                        <tr>
                            <td class="align-middle">{animal.name}</td>
                            <td class="align-middle text-end">
                                <RemoveButton id={animal.id} on:click={() => idToRemove = animal.id} />
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>