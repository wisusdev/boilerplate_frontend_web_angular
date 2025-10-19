/**
 * Archivo índice principal para todas las interfaces
 * Proporciona un punto único de importación para todas las interfaces de la aplicación
 */

// ============ EXPORTAR INTERFACES BASE ============
export * from '@api/interfaces/base.interface';

// ============ EXPORTAR MODELOS DE DATOS ============
export * from '@api/interfaces/data-models.interface';

// ============ EXPORTAR INTERFACES DE REQUESTS ============
export * from '@api/interfaces/api-requests.interface';

// ============ EXPORTAR INTERFACES DE RESPONSES ============
export * from '@api/interfaces/api-responses.interface';

// ============ RE-EXPORTACIONES ORGANIZADAS POR CATEGORÍA ============

// Authentication Requests
export type {LoginRequest, RegisterRequest, ChangePasswordRequest, ForgotPasswordRequest, ResetPasswordRequest} from '@api/interfaces/api-requests.interface';

// Authentication Responses
export type {LoginResponse, RegisterResponse, ChangePasswordResponse, ResetPasswordResponse, LogoutDeviceAuthResponse} from '@api/interfaces/api-responses.interface';

// User Requests
export type {StoreUserRequest, ProfileUpdateRequest} from '@api/interfaces/api-requests.interface';

// User Responses
export type {IndexUserResponse, ShowUserResponse, StoreUserResponse, ProfileUpdateResponse} from '@api/interfaces/api-responses.interface';

// Role Requests
export type {StoreRoleRequest} from '@api/interfaces/api-requests.interface';

// Role Responses
export type {IndexRoleResponse, ShowRoleResponse, UpdateStoreRoleResponse, IndexPermissionsResponse} from '@api/interfaces/api-responses.interface';

// Package Requests
export type {StoreUpdatePackageRequest} from '@api/interfaces/api-requests.interface';

// Package Responses
export type {ShowPackageResponse, StoreUpdatePackageResponse} from '@api/interfaces/api-responses.interface';

// Device Requests
export type {LogoutDeviceAuthRequest} from '@api/interfaces/api-requests.interface';

// Device Responses
export type {GetDeviceAuthListResponse} from '@api/interfaces/api-responses.interface';

// Invoice Responses
export type {IndexInvoicesResponse, ShowInvoiceResponse} from '@api/interfaces/api-responses.interface';

// Subscription Responses
export type {IndexSubscriptionsResponse} from '@api/interfaces/api-responses.interface';

// Wompi Responses
export type {GetWompiRegionsResponse} from '@api/interfaces/api-responses.interface';
