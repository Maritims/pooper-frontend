<script lang="ts">
    export let minimum = 1;
    export let maximum = 5;
    export let rating = 1;
    export let label = '';
    export let isEditable = false;

    function setRating(i: number): void {
        if(!isEditable || i > maximum || i < minimum) return;
        rating = i;
    }
</script>

<div>
    {#if label}
        <label for="rating">{label}</label>
    {/if}
    <div id="rating">
        {#each Array(maximum) as _, i}
            <i class="fs-1 text-warning {rating && rating >= (i + 1) ? 'fas' : 'far'} fa-star" on:click={() => setRating(i + 1)}></i>
        {/each}
    </div>
</div>