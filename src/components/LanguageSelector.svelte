<script lang="ts">
    import { languages, locale } from '../translations';

    let clazz: string = '';
    export { clazz as class };
</script>

<select class="form-select {clazz}" bind:value={$locale}>
    {#each languages as language}
        <option value={language.iso639_1}>{language.name}</option>
    {/each}
</select>