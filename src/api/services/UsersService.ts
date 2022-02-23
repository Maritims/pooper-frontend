/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ColorTheme } from '../models/ColorTheme';
import type { UserCreate } from '../models/UserCreate';
import type { UserRead } from '../models/UserRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Get Me
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static getMeUsersMeGet(): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }

    /**
     * Get All Users
     * @param page
     * @param pageSize
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static getAllUsersUsersGet(
        page?: number,
        pageSize: number = 100,
    ): CancelablePromise<Array<UserRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create
     * @param requestBody
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static createUsersPost(
        requestBody: UserCreate,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update
     * @param requestBody
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static updateUsersUpdatePatch(
        requestBody: UserCreate,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteUsersIdDelete(
        id: any,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{_id}',
            path: {
                '_id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Set Theme
     * @param theme
     * @returns ColorTheme Successful Response
     * @throws ApiError
     */
    public static setThemeUsersThemeThemePatch(
        theme: ColorTheme,
    ): CancelablePromise<ColorTheme> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/theme/{theme}',
            path: {
                'theme': theme,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}