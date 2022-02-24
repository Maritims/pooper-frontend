import { writable } from "svelte/store";

export type NavigationBarContext = {
    show: boolean
};

export const navigationBarStore = writable<NavigationBarContext>({
    show: false
});