import type { Writable } from 'svelte/store';
import { writable } from "svelte/store";

export type ModalContext = {
    isBackdropVisible: boolean
};

export enum ModalSize {
    Large = 'modal-lg',
    ExtraLarge = 'modal-xl',
    FullScreen = 'modal-fullscreen'
}

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