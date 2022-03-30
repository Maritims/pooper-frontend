<script lang="ts">
    import { ColorTheme } from '../api';
    import { t } from '../translations';
    import { colorThemeStore, getEnumFromString, getIconFromEnum } from './loaders/ColorThemeButton';

    let clazz = '';
    export { clazz as class };

    $: changeToTheme = $colorThemeStore == ColorTheme.DARK ? ColorTheme.LIGHT : ColorTheme.DARK;
</script>

{#each Object.keys(ColorTheme) as key}
    {#if $colorThemeStore === getEnumFromString(key)}
        <span class="d-inline {clazz}" role="button" on:click={() => colorThemeStore.update(colorTheme => colorTheme = changeToTheme)}>
            <i class="fas {getIconFromEnum(key)} text-light"></i>
            <span class="d-none d-lg-inline text-light">&nbsp;{$t({ key: `color.theme.button.${getEnumFromString(key).toLowerCase()}.mode` })}</span>
        </span>
    {/if}
{/each}