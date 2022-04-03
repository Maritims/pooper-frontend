/* eslint-disable no-var */
/// <reference types="svelte" />

export {}

declare global {
    var API_BASE_URL: string
    var VAPID_PUBLIC_KEY: string
    var MAPBOX_ACCESS_TOKEN: string
    var VERSION: string

    export interface Boolean {
        toYesNo(): string
    }
}