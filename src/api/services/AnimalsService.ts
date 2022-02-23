/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnimalCreate } from '../models/AnimalCreate';
import type { AnimalRead } from '../models/AnimalRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnimalsService {

    /**
     * Get Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getCountAnimalsCountGet(): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/animals/count',
        });
    }

    /**
     * Get All
     * @param includeDeactivated
     * @param page
     * @param pageSize
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static getAllAnimalsGet(
        includeDeactivated: boolean = false,
        page?: number,
        pageSize: number = 100,
    ): CancelablePromise<Array<AnimalRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/animals/',
            query: {
                'include_deactivated': includeDeactivated,
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
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static createAnimalsPost(
        requestBody: AnimalCreate,
    ): CancelablePromise<AnimalRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/animals/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get By Id
     * @param id
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static getByIdAnimalsIdGet(
        id: any,
    ): CancelablePromise<AnimalRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/animals/{_id}',
            path: {
                '_id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update
     * @param id
     * @param requestBody
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static updateAnimalsIdPut(
        id: number,
        requestBody: AnimalCreate,
    ): CancelablePromise<AnimalRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/animals/{_id}',
            path: {
                '_id': id,
            },
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
    public static deleteAnimalsIdDelete(
        id: any,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/animals/{_id}',
            path: {
                '_id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}