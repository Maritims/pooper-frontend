<script lang="ts">
    import { ColorTheme } from '../api';
    import { colorThemeStore } from './loaders/ColorThemeButton';
</script>

{#if $colorThemeStore == ColorTheme.DARK}
    <i class="fas fa-moon text-light" on:click={() => colorThemeStore.update(colorTheme => colorTheme = ColorTheme.LIGHT)}></i>
{:else}
    <i class="fas fa-sun text-light" on:click={() => colorThemeStore.update(colorTheme => colorTheme = ColorTheme.DARK)}></i>
{/if}