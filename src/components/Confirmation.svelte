<script lang="ts">
    import Modal from "./Modal.svelte";

    let _modal: Modal;
    let _callback: Function;

    export function confirm(callback: Function) {
        _modal.show();
        _callback = callback;
    }

    function handleOnClick() {
        _modal.hide();
        _callback();
    }
</script>

<Modal bind:this={_modal}>
    <span slot="title">Are you sure?</span>
    <span slot="body">Please confirm the action. Do you want to proceed?</span>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={_modal.hide}>No</button>
        <button type="button" class="btn btn-success" on:click={handleOnClick}>Yes</button>
    </span>
</Modal>