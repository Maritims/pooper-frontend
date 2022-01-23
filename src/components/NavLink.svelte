<script>
    import { Link } from "svelte-navigator";
  
    export let to = "";
  
    function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
        const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        // The object returned here is spread on the anchor element's attributes
        return {
            class: `nav-link ${isActive ? 'active' : ''}`
        };
    }
</script>

<Link to="{to}" getProps="{getProps}" class={$$props.class}>
    <slot />
</Link>