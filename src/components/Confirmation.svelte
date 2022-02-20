<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Modal from "./Modal.svelte";

    export let isVisible = false;

    const dispatch = createEventDispatcher();
</script>

<Modal bind:isVisible>
    <span slot="title">Are you sure?</span>
    <span slot="body">Please confirm the action. Do you want to proceed?</span>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => {
            isVisible = false;
            dispatch('cancel');
        }}>No</button>
        <button type="button" class="btn btn-success" on:click={() => {
            isVisible = false;
            dispatch('confirm');
        }}>Yes</button>
    </span>
</Modal>