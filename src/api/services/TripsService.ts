/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TripCreate } from '../models/TripCreate';
import type { TripRead } from '../models/TripRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TripsService {

    /**
     * Get All
     * @returns TripRead Successful Response
     * @throws ApiError
     */
    public static getAllTripsGet(): CancelablePromise<Array<TripRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trips/',
        });
    }

    /**
     * Create
     * @param requestBody
     * @returns TripRead Successful Response
     * @throws ApiError
     */
    public static createTripsPost(
        requestBody: TripCreate,
    ): CancelablePromise<TripRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/trips/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}