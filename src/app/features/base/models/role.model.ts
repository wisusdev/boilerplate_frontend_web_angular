/**
 * Modelos de datos para roles y permisos
 */

import { ApiCollectionResponse, PaginationLinks, PaginationMeta } from '@core/models/base.model';

// ============ ATRIBUTOS DE ROL Y PERMISOS ============

/**
 * Estructura de un permiso
 */
export interface Permission {
    name: string;
}

/**
 * Atributos de un rol
 */
export interface RoleAttributes {
    name: string;
    permissions: Permission[];
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
