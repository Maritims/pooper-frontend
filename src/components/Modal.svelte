<script lang="ts">
    import { modalStore, showBackdrop, hideBackdrop } from '../services/modals';

    let isVisible = false;

    export function show() {
        isVisible = true;
        showBackdrop();
    }

    export function hide() {
        isVisible = false;
        hideBackdrop();
    }
</script>

<div class="modal" tabindex="-1" style="{ isVisible ? "display:block" : "" }">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <slot name="title" />
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={hide}></button>
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