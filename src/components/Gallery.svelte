<script lang="ts">
    import { t } from "../translations";
    import type { GalleryImage } from "./loaders/Gallery";
    import { ModalSize } from "./loaders/Modal";
    import Modal from "./Modal.svelte";

    export let images: Array<GalleryImage> = [];

    let imageInFocus: GalleryImage | undefined;

    $: isModalVisible = !!imageInFocus;
</script>

<Modal bind:isVisible={isModalVisible} size={ModalSize.FullScreen}>
    <span slot="title">{imageInFocus?.title}</span>
    <div slot="body" class="container-fluid">
        <div class="row mb-2">
            <div class="col">
                <img src={imageInFocus?.filePath} class="img-fluid" alt={imageInFocus?.title} title={imageInFocus?.title} style="max-height:100%" />
            </div>
        </div>
    </div>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => imageInFocus = undefined}>{$t({ key: 'close' })}</button>
    </span>
</Modal>

{#each images as image}
    <img src={image.filePath} class="img-fluid" alt={image.title} title={image.title} on:click={() => imageInFocus = image} />
{/each}