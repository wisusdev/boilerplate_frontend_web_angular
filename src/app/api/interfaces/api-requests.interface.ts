/**
 * Interfaces unificadas para todos los requests de la API
 * Utiliza las interfaces base genéricas y modelos de datos comunes
 */


import {ApiRequest} from "@api/interfaces/base.interface";
import {
    ChangePasswordAttributes,
    ForgotPasswordAttributes,
    LoginAttributes, PackageAttributes,
    RegisterAttributes, ResetPasswordAttributes, UserAttributes, UserProfileAttributes
} from "@api/interfaces/data-models.interface";

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

// ============ USER REQUESTS ============

/**
 * Request para crear usuario
 */
export interface StoreUserRequest extends ApiRequest<UserAttributes & { roles: string[] }> {
    data: {
        type: string;
        attributes: UserAttributes & {
            password: string;
            password_confirmation: string;
            roles: string[];
        };
    };
}

/**
 * Request para actualizar perfil de usuario
 */
export interface ProfileUpdateRequest extends ApiRequest<UserProfileAttributes> {
    data: {
        type: string;
        id: string;
        attributes: UserProfileAttributes;
    };
}

// ============ ROLE REQUESTS ============

/**
 * Request para crear/actualizar rol
 */
export interface StoreRoleRequest {
    data: {
        type: string;
        id: string | null;
        attributes: {
            name: string;
            permissions: string[];
        };
    };
}

// ============ PACKAGE REQUESTS ============

/**
 * Request para crear/actualizar paquete
 */
export interface StoreUpdatePackageRequest extends ApiRequest<PackageAttributes> {
    data: {
        type: string;
        id?: string;
        attributes: {
            name: string;
            description: string;
            max_users: number;
            interval: string;
            interval_count: number;
            price: number;
            trial_days: number;
            active: boolean;
            created_by: string;
        };
    };
}

// ============ DEVICE REQUESTS ============

/**
 * Request para logout de dispositivo
 */
export interface LogoutDeviceAuthRequest {
    data: {
        type: string;
        id: string;
        attributes: {
            device_id: string;
        };
    };
}
