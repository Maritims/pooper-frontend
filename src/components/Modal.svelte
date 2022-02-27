<script lang="ts">
    import { showBackdrop, hideBackdrop, ModalSize } from './loaders/Modal';

    export let isVisible: boolean;
    export let size: ModalSize = ModalSize.Large;
    let clazz = '';
    export { clazz as class }

    $: isVisible ? showBackdrop() : hideBackdrop();
</script>

<div class="modal {clazz} {isVisible ? 'd-block' : ''}" tabindex="-1">
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