/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ColorTheme } from './ColorTheme';

export type UserCreate = {
    first_name: string;
    last_name: string;
    email_address: string;
    home_longitude?: number;
    home_latitude?: number;
    color_theme?: ColorTheme;
    password: string;
    password_repeated: string;
};
