<script lang="ts">
import { createEventDispatcher } from "svelte";


    export let currentPageNumber: number;
    export let pageSize: number;
    export let totalCount: number;

    const dispatch = createEventDispatcher<{changePage: number}>();

    $: pageNumbers = totalCount > 0 ? Array(Math.ceil(totalCount / pageSize) - 1) : [];
    $: dispatch('changePage', currentPageNumber);
</script>

<nav aria-label="Pagination">
    <ul class="pagination justify-content-center">
        {#each pageNumbers as _, pageNumber}
            <li class="page-item {currentPageNumber == pageNumber ? 'active' : ''}" on:click={() => currentPageNumber = pageNumber}>
                <button class="page-link">{pageNumber + 1}</button>
            </li>
        {/each}
    </ul>
</nav>