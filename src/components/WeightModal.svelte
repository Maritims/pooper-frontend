<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { AnimalsService, type AnimalRead, type AnimalWeightRead } from "../api";
    import { addToast } from "../services/toasts";
    import { d, t } from "../translations";
    import Accordion from "./Accordion.svelte";
    import AccordionItem from "./AccordionItem.svelte";
    import { ModalSize } from "./loaders/Modal";
    import Modal from "./Modal.svelte";
    import RemoveButton from "./RemoveButton.svelte";

    export let animal: AnimalRead | undefined;
    let weightHistory: Array<AnimalWeightRead> = [];
    let weightInGrams: number | undefined;
    let idToRemove: number | undefined;
    let showWeight = false;
    const dispatch = createEventDispatcher();

    async function handleOnSubmit() {
        if(!weightInGrams) {
            addToast({
                id: new Date().getTime(),
                body: $t({ key: 'weight.create.error' }),
                type: 'success',
                durationInMs: 3000
            });
            return;
        }

        await AnimalsService.createAnimalWeightAnimalsWeightPost({
            animal_id: animal!.id,
            weight_in_grams: weightInGrams
        });
        addToast({
            id: new Date().getTime(),
            body: $t({ key: 'weight.create.success', substitutions: [weightInGrams, animal!.name] }),
            type: 'success',
            durationInMs: 3000
        });

        weightInGrams = undefined;
        dispatch('done');
        weightHistory = await AnimalsService.getAnimalWeightHistoryAnimalsWeightIdHistoryGet(animal!.id);
    }

    async function handleOnConfirm() {
        await AnimalsService.deleteAnimalWeightAnimalsWeightIdDelete(idToRemove!);
        weightHistory = await AnimalsService.getAnimalWeightHistoryAnimalsWeightIdHistoryGet(animal!.id);
        idToRemove = undefined;
    }

    $: isConfirmationVisible = !!idToRemove;
    $: idToRemove, console.log(idToRemove), console.log(isConfirmationVisible);
    $: if(animal) AnimalsService.getAnimalWeightHistoryAnimalsWeightIdHistoryGet(animal.id).then(animalWeightReads => weightHistory = animalWeightReads);
</script>

<Modal isVisible={!!animal} size={ModalSize.ExtraLarge}>
    <span slot="title">{animal?.name}</span>
    <div class="container-fluid" slot="body">
        <div class="row">
            <div class="col">
                <div class="form-floating">
                    <input type="text" class="form-control" id="weightInGrams" placeholder={$t({ key: 'weight.create' })} bind:value={weightInGrams}>
                    <label for="weightInGrams">{$t({ key: 'weight.create' })}</label>
                </div>
            </div>
        </div>
        {#if weightHistory.length > 0}
            <div class="row mt-2">
                <div class="col">
                    <div class="form-floating">
                        <input type="text" class="form-control" readonly id="currentWeightInGrams" placeholder={$t({ key: 'weight.current' })} value={weightHistory[0].weight_in_grams}>
                        <label for="currentWeightInGrams">{$t({ key: 'weight.current' })}</label>
                    </div>
                </div>
            </div>
        {/if}
        <div class="row mt-2">
            <div class="col">
                <Accordion>
                    <AccordionItem header={$t({ key: 'weight.modal.accordion.title' })} bind:show={showWeight}>
                        {#if idToRemove}
                            <div class="text-center">
                                <h2>{$t({ key: 'confirmation.title' })}</h2>
                                <p>{$t({ key: 'confirmation.body' })}</p>
                            </div>
                        {:else}
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>{$t({ key: 'weight' })}</th>
                                        <th>{$t({ key: 'created' })}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each weightHistory as animalWeightRead}
                                        <tr>
                                            <td class="align-middle">{animalWeightRead.weight_in_grams}</td>
                                            <td class="align-middle">{d(animalWeightRead.created)}</td>
                                            <td class="align-middle text-end">
                                                <RemoveButton id={animalWeightRead.id} on:click={() => idToRemove = animalWeightRead.id} compact={true} />
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        {/if}
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </div>
    <span slot="footer">
        {#if idToRemove}
            <button type="button" class="btn btn-danger" on:click={() => idToRemove = 0}>{$t({ key: 'no' })}</button>
            <button type="button" class="btn btn-success" on:click={handleOnConfirm}>{$t({ key: 'yes' })}</button>
        {:else}
            <button type="button" class="btn btn-danger" on:click={() => dispatch('cancel')}>{$t({ key: 'close' })}</button>
            <button type="button" class="btn btn-success" on:click={handleOnSubmit}>{$t({ key: 'submit' })}</button>
        {/if}
    </span>
</Modal>