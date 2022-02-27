<script lang="ts">
    export let header: string;
    export let show: boolean = false;
</script>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button {show ? '' : 'collapsed'}" type="button" on:click={() => show = !show}>{header}</button>
    </h2>
    <div class="accordion-collapse collapse {show ? 'show' : ''}">
        <div class="accordion-body">
            <slot />
        </div>
    </div>
</div>