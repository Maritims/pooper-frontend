/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnimalCreate } from '../models/AnimalCreate';
import type { AnimalRead } from '../models/AnimalRead';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class AnimalsService {

    /**
     * Get Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getCountAnimalsCountGet(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/animals/count`,
        });
    }

    /**
     * Get All
     * @param page
     * @param pageSize
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static getAllAnimalsGet(
        page?: number,
        pageSize: number = 100,
    ): CancelablePromise<Array<AnimalRead>> {
        return __request({
            method: 'GET',
            path: `/animals/`,
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
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static createAnimalsPost(
        requestBody: AnimalCreate,
    ): CancelablePromise<AnimalRead> {
        return __request({
            method: 'POST',
            path: `/animals/`,
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
        return __request({
            method: 'GET',
            path: `/animals/${id}`,
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
        return __request({
            method: 'PUT',
            path: `/animals/${id}`,
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
        return __request({
            method: 'DELETE',
            path: `/animals/${id}`,
            errors: {
                422: `Validation Error`,
            },
        });
    }

}