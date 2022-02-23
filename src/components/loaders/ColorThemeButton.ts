import { writable, type Writable } from "svelte/store";
import { ColorTheme, UsersService } from "../../api";

const colorThemeKey = localStorage.getItem('colorThemeKey') as keyof typeof ColorTheme;
export const colorThemeStore: Writable<ColorTheme> = writable(colorThemeKey ? ColorTheme[colorThemeKey] : ColorTheme.LIGHT);

colorThemeStore.subscribe(async (value: ColorTheme) => {
    if(value) {
        await UsersService.setThemeUsersThemeThemePatch(value);
        localStorage.setItem('colorThemeKey', value.toUpperCase());
    }
});