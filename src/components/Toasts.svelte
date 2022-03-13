<script lang="ts">
    import { fade } from 'svelte/transition';
    import { toastStore, removeToast } from '../services/toasts';
</script>

<div class="toast-container">
    {#each $toastStore as toast}
        <div class="toast show align-items-center text-white bg-{toast.type} border-0" role="alert" aria-live="assertive" aria-atomic="true" transition:fade>
            <div class="d-flex">
                <div class="toast-body">{toast.body}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" on:click={() => removeToast(toast)}></button>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    .toast-container {
        position: absolute;
        top:1rem;
        right:1rem;
        z-index: 1;
    }
</style>