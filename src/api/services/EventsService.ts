/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventCreate } from '../models/EventCreate';
import type { EventRead } from '../models/EventRead';
import type { EventType } from '../models/EventType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EventsService {

    /**
     * Get Count
     * @param animalIds
     * @param eventType
     * @param days
     * @param hasTrip
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getCountEventsCountGet(
        animalIds?: Array<number>,
        eventType?: EventType,
        days?: number,
        hasTrip?: boolean,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/count',
            query: {
                'animal_ids': animalIds,
                'event_type': eventType,
                'days': days,
                'has_trip': hasTrip,
            },
            errors: {
                422: `Validation Error`,
            },
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
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{_id}',
            path: {
                '_id': id,
            },
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
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{_id}',
            path: {
                '_id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All
     * @param animalIds
     * @param eventType
     * @param days
     * @param hasTrip
     * @param page
     * @param pageSize
     * @param sortOrder
     * @returns EventRead Successful Response
     * @throws ApiError
     */
    public static getAllEventsGet(
        animalIds?: Array<number>,
        eventType?: EventType,
        days?: number,
        hasTrip?: boolean,
        page?: number,
        pageSize: number = 100,
        sortOrder: string = 'desc',
    ): CancelablePromise<Array<EventRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/',
            query: {
                'animal_ids': animalIds,
                'event_type': eventType,
                'days': days,
                'has_trip': hasTrip,
                'page': page,
                'page_size': pageSize,
                'sort_order': sortOrder,
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
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}