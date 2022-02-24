<script>
    import { getContext } from "svelte";
    import { Link } from "svelte-navigator";
    import { navigationBarStore } from './loaders/NavigationBar';
  
    let clazz = "";
    export { clazz as class };
    export let to = "";
  
    function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
        const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        // The object returned here is spread on the anchor element's attributes
        return {
            class: `${clazz} ${isActive ? 'active' : ''}`
        };
    }
</script>

<Link to="{to}" getProps="{getProps}" class={$$props.class} on:click={() => navigationBarStore.update(context => {
    context.show = false;
    return context;
})}>
    <slot />
</Link>