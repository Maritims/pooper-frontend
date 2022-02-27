<script lang="ts">
    import { t } from "../../translations";

    export let selectedOption: {} = '';
    export let options: Array<{description: string, value: {}}>;
    export function reset() {
        selectedOption = '';
    }
</script>

<select class="form-select" bind:value={selectedOption}>
    <option value="" selected>{$t({ key: 'dropdown.filter.default.option' })}</option>
    {#each options as option}
        <option value={option.value}>{option.description}</option>
    {/each}
</select>