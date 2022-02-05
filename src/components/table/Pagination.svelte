<script lang="ts">
    export let currentPageNumber: number;
    export let pageSize: number;
    export let totalCount: number;

    $: pageNumbers = totalCount > 0 ? Array(Math.ceil(totalCount / pageSize)) : [];
    $: if(currentPageNumber > pageNumbers.length) currentPageNumber = 0;
</script>

<nav aria-label="Pagination">
    <ul class="pagination justify-content-center">
        <li class="page-item" on:click={() => currentPageNumber -= currentPageNumber > 0 ? 1 : 0}>
            <button class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </button>
        </li>
        <li class="active d-sm-none page-item">
            <button class="page-link">Page {currentPageNumber + 1}</button>
        </li>
        {#each pageNumbers as _, pageNumber}
            <li class="d-none d-sm-inline page-item {currentPageNumber == pageNumber ? 'active' : ''}" on:click={() => currentPageNumber = pageNumber}>
                <button class="page-link">{pageNumber + 1}</button>
            </li>
        {/each}
        <li class="page-item" on:click={() => currentPageNumber += currentPageNumber < (pageNumbers.length - 1) ? 1 : 0}>
            <button class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </button>
        </li>
    </ul>
</nav>