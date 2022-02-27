<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { t } from "../translations";
    
    export let id: number;

    const dispatch = createEventDispatcher<{click: number}>();
</script>

<button class="btn btn-lg btn-danger" on:click={() => dispatch('click', id)}>
    <i class="fas fa-trash"></i><span class="d-none d-md-inline">&nbsp;{$t({ key: 'remove' })}</span>
</button>