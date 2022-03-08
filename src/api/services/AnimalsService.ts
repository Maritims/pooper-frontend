/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnimalCreate } from '../models/AnimalCreate';
import type { AnimalRead } from '../models/AnimalRead';
import type { ConditionType } from '../models/ConditionType';
import type { NoteCreate } from '../models/NoteCreate';
import type { NoteRead } from '../models/NoteRead';

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

    /**
     * Get All Notes
     * @returns NoteRead Successful Response
     * @throws ApiError
     */
    public static getAllNotesAnimalsNoteGet(): CancelablePromise<Array<NoteRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/animals/note',
        });
    }

    /**
     * Create
     * @param requestBody
     * @returns NoteRead Successful Response
     * @throws ApiError
     */
    public static createAnimalsNotePost(
        requestBody: NoteCreate,
    ): CancelablePromise<NoteRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/animals/note',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update
     * @param id
     * @param requestBody
     * @returns NoteRead Successful Response
     * @throws ApiError
     */
    public static updateAnimalsNoteIdPut(
        id: number,
        requestBody: NoteCreate,
    ): CancelablePromise<NoteRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/animals/note/{_id}',
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
    public static deleteAnimalsNoteIdDelete(
        id: any,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/animals/note/{_id}',
            path: {
                '_id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Toggle Condition
     * @param id
     * @param conditionType
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static toggleConditionAnimalsIdConditionTypePut(
        id: number,
        conditionType: ConditionType,
    ): CancelablePromise<AnimalRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/animals/{_id}/{condition_type}',
            path: {
                '_id': id,
                'condition_type': conditionType,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}