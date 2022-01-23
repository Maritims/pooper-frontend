<script lang="ts">
    import { onMount } from 'svelte';
    import { AnimalsService } from '../api';
    import Modal from '../components/Modal.svelte';
    import Confirmation from '../components/Confirmation.svelte';

    let animals = [];
    let newAnimalName: string;
    let modal: Modal;
    let confirmation: Confirmation;

    onMount(async () => animals = await AnimalsService.getAllAnimalsGet());

    async function handleOnSubmit(): Promise<void> {
        await AnimalsService.createAnimalsPost({
            name: newAnimalName
        });
        newAnimalName = '';
        animals = await AnimalsService.getAllAnimalsGet();
        modal.hide();
    }

    function handleOnClick(id: number): void {
        confirmation.confirm(async () => {
            await AnimalsService.deleteAnimalsIdDelete(id);
            animals = await AnimalsService.getAllAnimalsGet();
        });
    };
</script>

<Confirmation bind:this={confirmation} />

<Modal bind:this={modal}>
    <span slot="title">Create new animal</span>
    <form slot="body" on:submit|preventDefault={handleOnSubmit}>
        <div class="row mb-2">
            <label for="name" class="col-sm-4 col-form-label">Name</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" bind:value={newAnimalName} />
            </div>
        </div>
    </form>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={modal.hide}>Cancel</button>
        <button type="submit" class="btn btn-success" on:click={handleOnSubmit}>Submit</button>
    </span>
</Modal>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <button type="button" class="btn btn-lg btn-success" on:click={modal.show}>Create animal</button>
        </div>
    </div>
    <div class="row">
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
                                <button type="button" class="btn btn-lg btn-danger" on:click={() => handleOnClick(animal.id)}>Remove</button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>