/**
 * Modelos de datos comunes reutilizables en toda la aplicación
 * Estas interfaces definen la estructura de las entidades principales
 */

// ============ MODELOS DE USUARIO ============

import {DateString} from "@api/interfaces/base.interface";

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

// ============ MODELOS DE ROL ============

/**
 * Atributos de un rol
 */
export interface RoleAttributes {
    name: string;
    permissions: Permission[];
}

/**
 * Estructura de un permiso
 */
export interface Permission {
    name: string;
}

// ============ MODELOS DE PAQUETE ============

/**
 * Atributos de un paquete
 */
export interface PackageAttributes {
    name: string;
    description: string;
    limits?: string;
    max_users?: number;
    interval: string;
    interval_count: number;
    price: string | number;
    trial_days: number;
    active: boolean | number;
    created_by: string;
    created_at?: string;
    updated_at?: string;
}

// ============ MODELOS DE SUSCRIPCIÓN ============

/**
 * Atributos de una suscripción
 */
export interface SubscriptionAttributes {
    start_date: string;
    end_date: string;
    trial_ends_at: DateString;
    package_price: string;
    package_details: string;
    payment_method: string;
    payment_transaction_id: string;
    status: string;
}

/**
 * Relaciones de suscripción
 */
export interface SubscriptionRelationships {
    user: {
        type: string;
        id: string;
        attributes: UserAttributes;
    };
    createBy: {
        type: string;
        id: string;
        attributes: UserAttributes;
    };
    package: {
        type: string;
        id: string;
        attributes: PackageAttributes;
    } | null;
}

// ============ MODELOS DE FACTURA ============

/**
 * Atributos de una factura
 */
export interface InvoiceAttributes {
    user_id: string;
    created_by: string;
    invoice_number: string;
    invoice_date: string;
    due_date: string | null;
    total_amount: string;
    status: string;
    payment_method?: string;
    send_email?: boolean;
}

/**
 * Atributos de un item de factura
 */
export interface InvoiceItemAttributes {
    invoice_id: string;
    name: string;
    description: string;
    quantity: number;
    unit_price: string;
    total_price: string;
    metadata: any;
}

/**
 * Relaciones de factura
 */
export interface InvoiceRelationships {
    user: {
        first_name: string;
        last_name: string;
        email: string;
    };
    items: {
        type: string;
        id: string;
        attributes: InvoiceItemAttributes;
    }[];
}

// ============ MODELOS DE DISPOSITIVO ============

/**
 * Atributos de un dispositivo
 */
export interface DeviceAttributes {
    device_id: string | null;
    platform?: string | null;
    platform_version?: string | null;
    app_version?: string | null;
    language?: string | null;
    timezone?: string | null;
    created_at?: DateString;
    updated_at?: DateString;
}

// ============ MODELOS DE WOMPI ============

/**
 * Territorio de Wompi
 */
export interface Territorio {
    id: string;
    nombre: string;
}

/**
 * País de Wompi
 */
export interface Pais {
    id: string;
    nombre: string;
    territorios: Territorio[];
}

/**
 * Respuesta de países de Wompi
 */
export interface WompiPaisesResponse {
    [key: string]: Pais;
}

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
export interface RegisterAttributes extends UserAttributes {
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
