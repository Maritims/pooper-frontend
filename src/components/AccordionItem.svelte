<script lang="ts">
    import { slide } from 'svelte/transition';

    export let header: string;
    export let show: boolean = false;
</script>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button {show ? '' : 'collapsed'}" type="button" on:click={() => show = !show}>{header}</button>
    </h2>
    {#if show}
        <div class="accordion-collapse collapse show" transition:slide>
            <div class="accordion-body">
                <slot />
            </div>
        </div>
    {/if}
</div>