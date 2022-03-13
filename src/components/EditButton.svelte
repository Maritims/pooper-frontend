<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { t } from '../translations';
    
    export let id: number;
    export let compact = false;

    const dispatch = createEventDispatcher<{click: number}>();
</script>

<button class="btn btn-primary" on:click={() => dispatch('click', id)}>
    <i class="fas fa-pencil-alt"></i><span class="d-none {compact ? '' : 'd-md-inline' }">&nbsp;{$t({ key: 'edit.button.label' })}</span>
</button>