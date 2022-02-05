/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_confirm_password_reset_auth_confirm_password_reset_post } from '../models/Body_confirm_password_reset_auth_confirm_password_reset_post';
import type { Body_login_auth_token_post } from '../models/Body_login_auth_token_post';
import type { Body_reset_password_auth_reset_password_post } from '../models/Body_reset_password_auth_reset_password_post';
import type { LoginResponse } from '../models/LoginResponse';
import type { PasswordResetResponse } from '../models/PasswordResetResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
     * @param formData
     * @returns LoginResponse Successful Response
     * @throws ApiError
     */
    public static loginAuthTokenPost(
        formData: Body_login_auth_token_post,
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Reset Password
     * @param formData
     * @returns PasswordResetResponse Successful Response
     * @throws ApiError
     */
    public static resetPasswordAuthResetPasswordPost(
        formData: Body_reset_password_auth_reset_password_post,
    ): CancelablePromise<PasswordResetResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/reset-password',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Confirm Password Reset
     * @param formData
     * @returns PasswordResetResponse Successful Response
     * @throws ApiError
     */
    public static confirmPasswordResetAuthConfirmPasswordResetPost(
        formData: Body_confirm_password_reset_auth_confirm_password_reset_post,
    ): CancelablePromise<PasswordResetResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/confirm-password-reset',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}