import { writable } from "svelte/store";

export type Toast = {
    id: number
    body: string
    type: string
    durationInMs: number
};

export const toastStore = writable([]);

export const addToast = (toast: Toast): void => {
    toastStore.update(toasts => [...toasts, toast]);
    if(toast.durationInMs) setTimeout(() => removeToast(toast), toast.durationInMs);
};

export const removeToast = (toast: Toast): void => toastStore.update(toasts => toasts.filter(storedToast => storedToast.id !== toast.id));