/**
 * Interfaces unificadas para todos los responses de la API
 * Utiliza las interfaces base genéricas y modelos de datos comunes
 */

// ============ AUTHENTICATION RESPONSES ============

import {
    DeviceAttributes,
    InvoiceAttributes, InvoiceRelationships,
    PackageAttributes,
    RoleAttributes, SubscriptionAttributes, SubscriptionRelationships,
    UserAttributes,
    UserProfileAttributes,
    UserRelationships, WompiPaisesResponse
} from "@data/interfaces/data-models.interface";
import {ApiCollectionResponse, PaginationLinks, PaginationMeta, StatusResponse} from "@data/interfaces/base.interface";
import {FinancialConnectionsSession} from "@stripe/stripe-js";
import Permission = FinancialConnectionsSession.Permission;

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
 * Response para recuperar contraseña
 */
export interface ForgotPasswordResponse extends StatusResponse {}

/**
 * Response para reset de contraseña
 */
export interface ResetPasswordResponse extends StatusResponse {}

/**
 * Response para logout de dispositivo
 */
export interface LogoutDeviceAuthResponse extends StatusResponse {}

// ============ USER RESPONSES ============

/**
 * Response para obtener lista de usuarios
 */
export interface IndexUserResponse extends ApiCollectionResponse<UserAttributes> {
    data: UserData[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export interface UserData {
    type: string;
    id: string;
    attributes: UserAttributes;
    relationships: {
        roles: string[];
    };
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

// ============ ROLE RESPONSES ============

/**
 * Response para obtener lista de roles
 */
export interface IndexRoleResponse extends ApiCollectionResponse<RoleAttributes> {
    data: {
        type: string;
        id: string;
        name: string;
        permissions: Permission[];
    }[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

/**
 * Response para mostrar un rol específico
 */
export interface ShowRoleResponse {
    data: {
        type: string;
        id: string;
        name: string;
        permissions: Permission[];
    };
}

/**
 * Response para crear/actualizar rol
 */
export interface UpdateStoreRoleResponse extends ShowRoleResponse {}

/**
 * Response para obtener permisos
 */
export interface IndexPermissionsResponse {
    data: {
        type: string;
        attributes: {
            name: string;
        }[];
    };
}

// ============ PACKAGE RESPONSES ============

/**
 * Response para mostrar un paquete específico
 */
export interface ShowPackageResponse {
    data: {
        type: string;
        id: string;
        attributes: PackageAttributes;
    };
}

/**
 * Response para crear/actualizar paquete
 */
export interface StoreUpdatePackageResponse extends ShowPackageResponse {}

// ============ SUBSCRIPTION RESPONSES ============

/**
 * Response para obtener lista de suscripciones
 */
export interface IndexSubscriptionsResponse extends ApiCollectionResponse<SubscriptionAttributes> {
    data: {
        type: string;
        id: string;
        attributes: SubscriptionAttributes;
        relationships: SubscriptionRelationships;
    }[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

// ============ INVOICE RESPONSES ============

/**
 * Response para obtener lista de facturas
 */
export interface IndexInvoicesResponse extends ApiCollectionResponse<InvoiceAttributes> {
    data: {
        type: string;
        id: string;
        attributes: InvoiceAttributes;
    }[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

/**
 * Response para mostrar una factura específica
 */
export interface ShowInvoiceResponse {
    data: {
        type: string;
        id: string;
        attributes: InvoiceAttributes;
        relationships: InvoiceRelationships;
    };
}

// ============ DEVICE RESPONSES ============

/**
 * Response para obtener lista de dispositivos
 */
export interface GetDeviceAuthListResponse extends ApiCollectionResponse<DeviceAttributes> {
    data: {
        type: string;
        id: string;
        attributes: DeviceAttributes;
    }[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

// ============ WOMPI RESPONSES ============

/**
 * Response para obtener regiones de Wompi
 */
export interface GetWompiRegionsResponse extends WompiPaisesResponse {}
