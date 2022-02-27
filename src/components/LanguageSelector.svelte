<script lang="ts">
    import { languages, locale } from '../translations';
</script>

<select class="form-select w-10 mx-2" bind:value={$locale}>
    {#each languages as language}
        <option value={language.iso639_1}>{language.name}</option>
    {/each}
</select>