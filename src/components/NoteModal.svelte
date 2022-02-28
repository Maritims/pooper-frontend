<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { AnimalsService, type AnimalRead } from "../api";
    import Modal from "./Modal.svelte";
    import { d, t } from '../translations';
    import { addToast } from "../services/toasts";
    import AccordionItem from "./AccordionItem.svelte";
    import Accordion from "./Accordion.svelte";
    import RemoveButton from "./RemoveButton.svelte";
    import EditButton from "./EditButton.svelte";
    import { ModalSize } from "./loaders/Modal";

    export let animal: AnimalRead | undefined;

    const dispatch = createEventDispatcher();
    let idToEdit = 0;
    let idToRemove = 0;
    let noteText: string;
    let showNotes = false;

    async function handleOnSubmit(): Promise<void> {
        let toastBody = '';
        
        if(idToEdit > 0) {
            await AnimalsService.updateAnimalsNoteIdPut(idToEdit, {
                animal_id: animal!.id,
                text: noteText
            });
            toastBody = 'note.update.success';
            idToEdit = 0;
        } else {
            await AnimalsService.createAnimalsNotePost({
                animal_id: animal!.id,
                text: noteText
            });
            toastBody = 'note.create.success';
        }

        addToast({
            id: new Date().getTime(),
            body: $t({ key: toastBody }),
            type: 'success',
            durationInMs: 3000
        });

        noteText = '';
        dispatch('done');
    }

    async function cancel() {
        idToEdit = 0;
        noteText = '';
        showNotes = false;
        dispatch('cancel');
    }
</script>

<Modal isVisible={!!animal} size={ModalSize.ExtraLarge}>
    <span slot="title">{animal?.name}</span>
    <div class="container-fluid" slot="body">
        <form on:submit|preventDefault={handleOnSubmit}>
            {#if idToEdit > 0}
                <div class="row">
                    <div class="col">
                        <div class="form-floating">
                            <textarea class="form-control" id="createNote" placeholder={$t({ key: 'animals.create.note'} )} style="height:100px" bind:value={noteText} maxlength="256" />
                            <label for="createNote">{$t({ key: 'animals.create.note' })}</label>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="row">
                    <div class="col">
                        <div class="form-floating">
                            <textarea class="form-control" id="createNote" placeholder={$t({ key: 'animals.create.note'} )} style="height:100px" bind:value={noteText} maxlength="256"></textarea>
                            <label for="createNote">{$t({ key: 'animals.create.note' })}</label>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col">
                        {#if animal}
                            <Accordion>
                                <AccordionItem header={$t({ key: 'note.modal.accordion.title' })} bind:show={showNotes}>
                                    {#if idToRemove > 0}
                                        <div class="text-center">
                                            <h2>{$t({ key: 'confirmation.title' })}</h2>
                                            <p>{$t({ key: 'confirmation.body' })}</p>
                                        </div>
                                    {:else}
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>{$t({ key: 'note.modal.table.header.note.title' })}</th>
                                                    <th class="d-none d-lg-table-cell">{$t({ key: 'last.updated' })}</th>
                                                    <th class="d-none d-lg-table-cell">{$t({ key: 'created' })}</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {#each animal.notes as note}
                                                    {@const noteHeader = note.text.substring(0, note.text.length > 25 ? 25 : note.text.length)}
                                                    <tr class="align-middle">
                                                        <td>{noteHeader.padEnd(noteHeader.length == 25 ? noteHeader.length + 3 : 0, '.')}</td>
                                                        <td class="d-none d-lg-table-cell">{note.updated_by_user_name}, {d(note.updated)}</td>
                                                        <td class="d-none d-lg-table-cell">{note.created_by_user_name}, {d(note.created)}</td>
                                                        <td class="text-end">
                                                            <EditButton id={note.id} on:click={() => {
                                                                idToEdit = note.id;
                                                                noteText = note.text;
                                                            }} compact={true} />
                                                            <RemoveButton id={note.id} on:click={() => idToRemove = note.id} compact={true} />
                                                        </td>
                                                    </tr>
                                                {/each}
                                            </tbody>
                                        </table>
                                    {/if}
                                </AccordionItem>
                            </Accordion>
                        {/if}
                    </div>
                </div>
            {/if}
        </form>
    </div>
    <span slot="footer">
        {#if idToRemove > 0}
            <button type="button" class="btn btn-danger" on:click={() => idToRemove = 0}>{$t({ key: 'no' })}</button>
            <button type="button" class="btn btn-success" on:click={async () => {
                await AnimalsService.deleteAnimalsNoteIdDelete(idToRemove);
                idToRemove = 0;
                dispatch('remove');
            }}>{$t({ key: 'yes' })}</button>
        {:else if idToEdit > 0}
            <button type="button" class="btn btn-danger" on:click={() => {
                idToEdit = 0;
                noteText = '';
            }}>{$t({ key: 'back' })}</button>
            <button type="submit" class="btn btn-success" disabled={!noteText} on:click={handleOnSubmit}>{$t({ key: 'submit' })}</button>
        {:else}
            <button type="button" class="btn btn-danger" on:click={cancel}>{$t({ key: 'close' })}</button>
            <button type="submit" class="btn btn-success" disabled={!noteText} on:click={handleOnSubmit}>{$t({ key: 'submit' })}</button>
        {/if}
    </span>
</Modal>