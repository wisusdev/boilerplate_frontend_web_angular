/**
 * Modelos de datos para el módulo de autenticación
 */

import { ApiRequest, StatusResponse } from '@core/models/base.model';
import { UserProfileAttributes, UserRelationships } from '@features/base/models/user.model';

// ============ ATRIBUTOS DE AUTENTICACIÓN ============

/**
 * Atributos para login
 */
export interface LoginAttributes {
    email: string;
    password: string;
}

/**
 * Atributos para registro
 */
export interface RegisterAttributes {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

/**
 * Atributos para cambio de contraseña
 */
export interface ChangePasswordAttributes {
    current_password: string;
    password: string;
    password_confirmation: string;
}

/**
 * Atributos para recuperar contraseña
 */
export interface ForgotPasswordAttributes {
    email: string;
}

/**
 * Atributos para reset de contraseña
 */
export interface ResetPasswordAttributes {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

// ============ AUTHENTICATION REQUESTS ============

/**
 * Request para login de usuario
 */
export interface LoginRequest extends ApiRequest<LoginAttributes> {
    data: {
        type: 'users';
        attributes: LoginAttributes;
    };
}

/**
 * Request para registro de usuario
 */
export interface RegisterRequest extends ApiRequest<RegisterAttributes> {
    data: {
        type: 'users';
        attributes: RegisterAttributes;
    };
}

/**
 * Request para cambio de contraseña
 */
export interface ChangePasswordRequest extends ApiRequest<ChangePasswordAttributes> {
    data: {
        type: string;
        id: string;
        attributes: ChangePasswordAttributes;
    };
}

/**
 * Request para recuperar contraseña
 */
export interface ForgotPasswordRequest extends ApiRequest<ForgotPasswordAttributes> {
    data: {
        type: string;
        attributes: ForgotPasswordAttributes;
    };
}

/**
 * Request para reset de contraseña
 */
export interface ResetPasswordRequest extends ApiRequest<ResetPasswordAttributes> {
    data: {
        type: string;
        attributes: ResetPasswordAttributes;
    };
}

// ============ AUTHENTICATION RESPONSES ============

/**
 * Response para login exitoso
 */
export interface LoginResponse {
    data: {
        type: string;
        id: string;
        attributes: {
            user: UserProfileAttributes;
        };
        relationships: UserRelationships;
    };
}

/**
 * Response para registro exitoso
 */
export interface RegisterResponse extends StatusResponse {}

/**
 * Response para cambio de contraseña
 */
export interface ChangePasswordResponse extends StatusResponse {}

/**
 * Response para recuperar contraseña
 */
export interface ForgotPasswordResponse extends StatusResponse {}

/**
 * Response para reset de contraseña
 */
export interface ResetPasswordResponse extends StatusResponse {}
