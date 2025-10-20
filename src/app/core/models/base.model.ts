/**
 * Interfaces base genéricas para la API siguiendo el estándar JSON:API
 * Estas interfaces proporcionan la estructura común reutilizable para todas las comunicaciones con la API
 */

// ============ INTERFACES BASE GENÉRICAS ============

/**
 * Estructura básica de un recurso en JSON:API
 */
export interface ApiResource<T = any> {
    type: string;
    id?: string;
    attributes?: T;
    relationships?: Record<string, any>;
}

/**
 * Estructura base para requests que siguen el estándar JSON:API
 */
export interface ApiRequest<T = any> {
    data: ApiResource<T>;
}

/**
 * Estructura base para responses que siguen el estándar JSON:API
 */
export interface ApiResponse<T = any> {
    data: ApiResource<T>;
}

/**
 * Estructura para responses que contienen múltiples recursos
 */
export interface ApiCollectionResponse<T = any> {
    data: ApiResource<T>[];
    links?: PaginationLinks;
    meta?: PaginationMeta;
}

/**
 * Estructura para responses de operaciones que solo retornan status y mensaje
 */
export interface StatusResponse {
    data: {
        type: string;
        attributes: {
            status: boolean;
            message: string;
        };
    };
}

// ============ INTERFACES DE PAGINACIÓN ============

/**
 * Enlaces de paginación estándar
 */
export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

/**
 * Metadatos de paginación
 */
export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationMetaLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

/**
 * Enlaces específicos en los metadatos de paginación
 */
export interface PaginationMetaLink {
    url: string | null;
    label: string;
    active: boolean;
}

// ============ INTERFACES DE UTILIDAD ============

/**
 * Estructura para errores de validación
 */
export interface ErrorMessages {
    [key: string]: string;
}

/**
 * Estructura base para relaciones
 */
export interface BaseRelationships {
    [key: string]: any;
}

// ============ TIPOS DE UTILIDAD ============

/**
 * Tipo para representar fechas que pueden ser string o null
 */
export type DateString = string | null;

/**
 * Tipo para IDs que pueden ser string o number
 */
export type ID = string | number;
