import { derived, writable } from "svelte/store";
import { getLogger, LogLevel } from "./services/logger";
import en from './translations/en';
import nb from './translations/nb';

enum ISO639_1 {
    EN = 'en',
    NB = 'nb'
};

type Language = {
    iso639_1: ISO639_1
    name: string
};

type Locale = {
    iso639_1: ISO639_1
    translations: {}
};

export const locale = writable<ISO639_1>(localStorage.getItem('locale') as ISO639_1 || ISO639_1.EN);

locale.subscribe(iso639_1 => localStorage.setItem('locale', iso639_1));

const locales: Array<Locale> = [
    {
        iso639_1: ISO639_1.EN,
        translations: en,
    }, {
        iso639_1: ISO639_1.NB,
        translations: nb
    }
];

export const languages: Array<Language> = [{
    iso639_1: ISO639_1.EN,
    name: 'English'
}, {
    iso639_1: ISO639_1.NB,
    name: 'Norsk'
}];

const log = getLogger({
    context: 'translations',
    level: LogLevel.ERROR
});

export type TranslationRequest = {
    key: string
    substitutions?: Array<number | string>
};

export const t = derived(locale, ($iso639_1) => (translationRequest: TranslationRequest): string => {
    const translations = locales.find(l => l.iso639_1 === $iso639_1)?.translations;
    if(!translations) {
        log.error(`Unsupported locale: ${$iso639_1}`);
        return translationRequest.key;
    }
    
    const keys = [...Object.keys(translations)];
    const i = keys.indexOf(translationRequest.key);
    if(i === -1) {
        log.error(`Unsupported key: ${translationRequest.key}`);
        return translationRequest.key;
    }

    let translation = Object.values(translations)[i] as string;
    translationRequest.substitutions?.forEach((val, i) => translation = translation.replace(`{${i}}`, val.toString()));

    return translation;
});

export const d = (date: Date | string | Number): string | undefined => {
    if(date instanceof Date) return date.toLocaleString();
    if(typeof date === 'string') return new Date(Date.parse(date as string)).toLocaleString();
    if(date instanceof Number) return new Date(date as number).toLocaleString();
    return
};