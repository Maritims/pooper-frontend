<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { t } from "../translations";
    import Modal from "./Modal.svelte";

    export let isVisible = false;

    const dispatch = createEventDispatcher();
</script>

<Modal bind:isVisible>
    <span slot="title">{$t({ key: 'confirmation.title' })}</span>
    <span slot="body">{$t({ key: 'confirmation.body' })}</span>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => {
            isVisible = false;
            dispatch('cancel');
        }}>{$t({ key: 'no' })}</button>
        <button type="button" class="btn btn-success" on:click={() => {
            isVisible = false;
            dispatch('confirm');
        }}>{$t({ key: 'yes' })}</button>
    </span>
</Modal>