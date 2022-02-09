/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationSubscriptionCreate } from '../models/NotificationSubscriptionCreate';
import type { NotificationSubscriptionRead } from '../models/NotificationSubscriptionRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationsService {

    /**
     * Subscribe
     * @param requestBody
     * @returns NotificationSubscriptionRead Successful Response
     * @throws ApiError
     */
    public static subscribeNotificationsSubscribePut(
        requestBody: NotificationSubscriptionCreate,
    ): CancelablePromise<NotificationSubscriptionRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/notifications/subscribe',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Subscribe
     * @param requestBody
     * @returns NotificationSubscriptionRead Successful Response
     * @throws ApiError
     */
    public static subscribeNotificationsSubscribePost(
        requestBody: NotificationSubscriptionCreate,
    ): CancelablePromise<NotificationSubscriptionRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/notifications/subscribe',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}