/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ColorTheme } from './ColorTheme';

export type UserRead = {
    first_name: string;
    last_name: string;
    email_address: string;
    home_longitude?: number;
    home_latitude?: number;
    color_theme?: ColorTheme;
    id: number;
    is_disabled: boolean;
    created: string;
    updated: string;
};
