<script lang="ts">
    import { ColorTheme } from '../api';
    import { colorThemeStore } from './loaders/ColorThemeButton';

    let clazz: string = '';
    export { clazz as class };
</script>

{#if $colorThemeStore == ColorTheme.DARK}
    <i class="{clazz} fas fa-moon text-light" on:click={() => colorThemeStore.update(colorTheme => colorTheme = ColorTheme.LIGHT)}></i>
{:else}
    <i class="{clazz} fas fa-sun text-light" on:click={() => colorThemeStore.update(colorTheme => colorTheme = ColorTheme.DARK)}></i>
{/if}