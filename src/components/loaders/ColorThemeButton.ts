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

export function getEnumFromString(key: string): ColorTheme {
    return ColorTheme[key as keyof typeof ColorTheme];
}

export function getIconFromEnum(key: string): string {
    const enumValue = getEnumFromString(key);
    switch(enumValue) {
        case ColorTheme.DARK: return 'fa-moon';
        case ColorTheme.LIGHT: return 'fa-sun';
    }
}