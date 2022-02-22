import { writable, type Writable } from "svelte/store";

export type ThemeContext = {
    mode: string
};

export const themeStore: Writable<ThemeContext> = writable({
    mode: 'light'
});

export const setMode = (mode: string) => themeStore.update(theme => {
    theme.mode = mode;
    return theme;
});