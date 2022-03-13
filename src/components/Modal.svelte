<script lang="ts">
    import { fly } from 'svelte/transition';
    import { showBackdrop, hideBackdrop, ModalSize } from './loaders/Modal';

    export let isVisible: boolean;
    export let size: ModalSize = ModalSize.Large;
    let clazz = '';
    export { clazz as class }

    $: isVisible ? showBackdrop() : hideBackdrop();
</script>

{#if isVisible}
    <div class="modal {clazz} d-block" tabindex="-1" transition:fly={{ y: -50, duration: 300 }}>
        <div class="modal-dialog {size}">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <slot name="title" />
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={() => isVisible = false}></button>
                </div>
                <div class="modal-body">
                    <slot name="body" />
                </div>
                <div class="modal-footer">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
{/if}