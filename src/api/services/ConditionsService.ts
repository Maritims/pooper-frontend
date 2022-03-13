/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConditionRead } from '../models/ConditionRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConditionsService {

    /**
     * Get All
     * @param animalIds
     * @param page
     * @param pageSize
     * @param sortOrder
     * @returns ConditionRead Successful Response
     * @throws ApiError
     */
    public static getAllConditionsGet(
        animalIds?: Array<number>,
        page?: number,
        pageSize: number = 100,
        sortOrder: string = 'desc',
    ): CancelablePromise<Array<ConditionRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/conditions/',
            query: {
                'animal_ids': animalIds,
                'page': page,
                'page_size': pageSize,
                'sort_order': sortOrder,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}