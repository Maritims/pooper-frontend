<script lang="ts">
    export let tabButtons: Array<{
        id: string,
        title: string
    }>;
    export let activeTabId: string;
</script>

<ul class="nav nav-tabs" role="tablist">
    {#each tabButtons as tabButton}
        <li class="nav-item" id="{tabButton.id}-tab" on:click={() => activeTabId = tabButton.id}>
            <button class="nav-link {activeTabId == tabButton.id ? 'active' : ''}">{tabButton.title}</button>
        </li>
    {/each}
</ul>

<slot />