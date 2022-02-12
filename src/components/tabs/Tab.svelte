<script lang="ts">
    export let id: string;
    export let show: boolean;
</script>

<div class="tab-pane fade {show ? 'd-block show' : 'd-none'}" {id} role="tabpanel" aria-labelledby="#{id}">
    <slot />
</div>