<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { t } from '../translations';
    
    export let id: number;

    const dispatch = createEventDispatcher<{click: number}>();
</script>

<button class="btn btn-lg btn-primary" on:click={() => dispatch('click', id)}>
    <i class="fas fa-pencil-alt"></i><span class="d-none d-md-inline">&nbsp;{$t({ key: 'edit.button.label' })}</span>
</button>