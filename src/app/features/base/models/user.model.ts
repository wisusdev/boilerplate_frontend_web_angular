/**
 * Modelos de datos para usuarios
 */

import { ApiRequest, ApiCollectionResponse, PaginationLinks, PaginationMeta, DateString } from '@core/models/base.model';

// ============ ATRIBUTOS DE USUARIO ============

/**
 * Atributos básicos de un usuario
 */
export interface UserAttributes {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at?: DateString;
    created_at?: string;
    updated_at?: string;
    password?: string;
    password_confirmation?: string;
}

/**
 * Atributos extendidos de usuario para perfil
 */
export interface UserProfileAttributes extends UserAttributes {
    avatar: string | null;
    language: string;
}

/**
 * Relaciones de usuario
 */
export interface UserRelationships {
    roles: string[];
    permissions?: string[];
    access?: {
        token: string;
        token_type: string;
        expires_at: string;
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

// ============ USER RESPONSES ============

/**
 * Estructura de datos de usuario
 */
export interface UserData {
    type: string;
    id: string;
    attributes: UserAttributes;
    relationships: {
        roles: string[];
    };
}

/**
 * Response para obtener lista de usuarios
 */
export interface IndexUserResponse extends ApiCollectionResponse<UserAttributes> {
    data: UserData[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

/**
 * Response para mostrar un usuario específico
 */
export interface ShowUserResponse {
    data: {
        type: string;
        id: string;
        attributes: UserAttributes;
        relationships: {
            roles: string[];
        };
    };
}

/**
 * Response para crear usuario
 */
export interface StoreUserResponse extends ShowUserResponse {}

/**
 * Response para actualizar perfil
 */
export interface ProfileUpdateResponse {
    data: {
        type: string;
        id: string;
        attributes: UserProfileAttributes;
    };
}
