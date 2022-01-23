/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventCreate } from '../models/EventCreate';
import type { EventRead } from '../models/EventRead';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class EventsService {

    /**
     * Get Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getCountEventsCountGet(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/events/count`,
        });
    }

    /**
     * Get Event
     * @param id
     * @returns EventRead Successful Response
     * @throws ApiError
     */
    public static getEventEventsIdGet(
        id: number,
    ): CancelablePromise<EventRead> {
        return __request({
            method: 'GET',
            path: `/events/${id}`,
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
    public static deleteEventsIdDelete(
        id: any,
    ): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/events/${id}`,
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All
     * @param page
     * @param pageSize
     * @returns EventRead Successful Response
     * @throws ApiError
     */
    public static getAllEventsGet(
        page?: number,
        pageSize: number = 100,
    ): CancelablePromise<Array<EventRead>> {
        return __request({
            method: 'GET',
            path: `/events/`,
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
     * @returns EventRead Successful Response
     * @throws ApiError
     */
    public static createEventsPost(
        requestBody: EventCreate,
    ): CancelablePromise<EventRead> {
        return __request({
            method: 'POST',
            path: `/events/`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}