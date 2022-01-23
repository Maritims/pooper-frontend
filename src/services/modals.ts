import { Writable, writable } from "svelte/store";

export type ModalContext = {
    isBackdropVisible: boolean
};

export const modalStore: Writable<ModalContext> = writable({
    isBackdropVisible: false
});

export const showBackdrop = () => modalStore.update(modal => {
    modal.isBackdropVisible = true;
    return modal;
});

export const hideBackdrop = () => modalStore.update(modal => {
    modal.isBackdropVisible = false;
    return modal;
});