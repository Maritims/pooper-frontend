/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnimalCreate } from '../models/AnimalCreate';
import type { AnimalRead } from '../models/AnimalRead';
import type { AnimalWeightCreate } from '../models/AnimalWeightCreate';
import type { AnimalWeightRead } from '../models/AnimalWeightRead';
import type { ConditionType } from '../models/ConditionType';
import type { NoteCreate } from '../models/NoteCreate';
import type { NoteRead } from '../models/NoteRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnimalsService {

    /**
     * Get Animal Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getAnimalCountAnimalsCountGet(): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/animals/count',
        });
    }

    /**
     * Get All Animals
     * @param includeDeactivated
     * @param includeEvents
     * @param includeConditions
     * @param includeWeightHistory
     * @param page
     * @param pageSize
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static getAllAnimalsAnimalsGet(
        includeDeactivated: boolean = false,
        includeEvents: boolean = false,
        includeConditions: boolean = false,
        includeWeightHistory: boolean = false,
        page?: number,
        pageSize: number = 100,
    ): CancelablePromise<Array<AnimalRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/animals/',
            query: {
                'include_deactivated': includeDeactivated,
                'include_events': includeEvents,
                'include_conditions': includeConditions,
                'include_weight_history': includeWeightHistory,
                'page': page,
                'page_size': pageSize,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Animal
     * @param requestBody
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static createAnimalAnimalsPost(
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
     * Get Animal By Id
     * @param id
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static getAnimalByIdAnimalsIdGet(
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
     * Update Animal
     * @param id
     * @param requestBody
     * @returns AnimalRead Successful Response
     * @throws ApiError
     */
    public static updateAnimalAnimalsIdPut(
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
     * Delete Animal
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteAnimalAnimalsIdDelete(
        id: number,
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
     * Create Note
     * @param requestBody
     * @returns NoteRead Successful Response
     * @throws ApiError
     */
    public static createNoteAnimalsNotePost(
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
     * Update Note
     * @param id
     * @param requestBody
     * @returns NoteRead Successful Response
     * @throws ApiError
     */
    public static updateNoteAnimalsNoteIdPut(
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
     * Delete Note
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteNoteAnimalsNoteIdDelete(
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

    /**
     * Get Current Animal Weight
     * @param id
     * @returns AnimalWeightRead Successful Response
     * @throws ApiError
     */
    public static getCurrentAnimalWeightAnimalsIdWeightGet(
        id: number,
    ): CancelablePromise<AnimalWeightRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/animals/{_id}/weight',
            path: {
                '_id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Animal Weight History
     * @param id
     * @param page
     * @param pageSize
     * @returns AnimalWeightRead Successful Response
     * @throws ApiError
     */
    public static getAnimalWeightHistoryAnimalsWeightIdHistoryGet(
        id: number,
        page?: number,
        pageSize: number = 100,
    ): CancelablePromise<Array<AnimalWeightRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/animals/weight/{_id}/history',
            path: {
                '_id': id,
            },
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
     * Create Animal Weight
     * @param requestBody
     * @returns AnimalWeightRead Successful Response
     * @throws ApiError
     */
    public static createAnimalWeightAnimalsWeightPost(
        requestBody: AnimalWeightCreate,
    ): CancelablePromise<AnimalWeightRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/animals/weight',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Animal Weight
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteAnimalWeightAnimalsWeightIdDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/animals/weight/{_id}',
            path: {
                '_id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}