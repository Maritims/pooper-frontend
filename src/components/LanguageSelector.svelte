<script lang="ts">
    import { languages, locale, t, type Language } from '../translations';
    import { createPopper } from '@popperjs/core';
    import { onMount } from 'svelte';

    let clazz: string = '';
    export { clazz as class };

    let currentLanguage: Language | undefined;
    let languagePicker: HTMLDivElement;
    let popover: HTMLDivElement;
    let arrowElement: HTMLDivElement;
    let isVisible = false;

    onMount(() => locale.subscribe(iso639_1 => currentLanguage = languages.find(language => language.iso639_1 === iso639_1)));

    function onClickOutside(e: MouseEvent) {
        if(popover && !languagePicker.contains(e.target as HTMLElement)) isVisible = popover.contains(e.target as HTMLElement);
    }

    $: if(languagePicker && popover) createPopper(languagePicker, popover, {
        placement: 'bottom',
        modifiers: [{
            name: 'arrow',
            options: {
                element: arrowElement
            }
        }]
    });
</script>

<svelte:body on:click={onClickOutside} />

<div class="mx-2 {clazz}">
    {#if isVisible}
        <div bind:this={popover} class="popover bs-popover-bottom">
            <div bind:this={arrowElement} class="popover-arrow"></div>
            <div class="popover-header bg-dark text-light">
                {$t({ key: 'language.selector.choose.language' })}
            </div>
            <div class="popover-body bg-dark text-light">
                {#each languages as language}
                    <div on:click={() => {
                        $locale = language.iso639_1;
                        isVisible = !isVisible;
                    }} class="language" role="button">
                        <span class="fi fi-{language.iso3611_1_alpha_2}"></span> {language.name}
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <div bind:this={languagePicker} on:click={() => isVisible = !isVisible} class="text-light" role="button">
        <span class="fi fi-{currentLanguage?.iso3611_1_alpha_2.toLowerCase()}"></span> {currentLanguage?.name}
    </div>
</div>

<style class="scss">
    @import '~flag-icons/sass/flag-icons.scss';
</style>