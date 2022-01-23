/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCreate } from '../models/UserCreate';
import type { UserRead } from '../models/UserRead';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class UsersService {

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
        return __request({
            method: 'GET',
            path: `/users/`,
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
        return __request({
            method: 'POST',
            path: `/users/`,
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
        return __request({
            method: 'DELETE',
            path: `/users/${id}`,
            errors: {
                422: `Validation Error`,
            },
        });
    }

}