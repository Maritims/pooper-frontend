<script lang="ts">
    import { t } from "../../translations";
    import { getFloorAndCeil } from "../../utils/NumberUtils";

    export let currentPageNumber: number;
    export let pageSize: number;
    export let totalCount: number;

    let list: Array<number> = [];

    $: pageNumbers = totalCount > 0 ? Array(Math.ceil(totalCount / pageSize)) : [];
    $: if(currentPageNumber > (pageNumbers.length - 1)) currentPageNumber = 0;
    $: range = getFloorAndCeil(currentPageNumber, pageNumbers.length, 10);
    $: {
        list = [];
        for(let i = range.min; i < range.max; i++) {
            list.push(i);
        }
    }

</script>

<nav aria-label="Pagination">
    <ul class="pagination justify-content-center d-flex flex-wrap">
        <li class="page-item" on:click={() => currentPageNumber -= currentPageNumber > 0 ? 1 : 0}>
            <button class="page-link" aria-label={$t({ key: 'pagination.previous' })}>
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">{$t({ key: 'pagination.previous' })}</span>
            </button>
        </li>
        <li class="active d-sm-none page-item">
            <button class="page-link">Page {currentPageNumber + 1}</button>
        </li>
        {#each list as pageNumber}
            <li class="d-none d-sm-inline page-item {currentPageNumber == pageNumber ? 'active' : ''}" on:click={() => currentPageNumber = pageNumber}>
                <button class="page-link">{pageNumber + 1}</button>
            </li>
        {/each}
        <li class="page-item" on:click={() => currentPageNumber += currentPageNumber < (pageNumbers.length - 1) ? 1 : 0}>
            <button class="page-link" href="#" aria-label={$t({ key: 'pagination.next' })}>
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">{$t({ key: 'pagination.next' })}</span>
            </button>
        </li>
    </ul>
</nav>