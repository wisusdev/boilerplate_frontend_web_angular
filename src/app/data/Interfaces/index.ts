/**
 * Archivo índice principal para todas las interfaces
 * Proporciona un punto único de importación para todas las interfaces de la aplicación
 */

// ============ EXPORTAR INTERFACES BASE ============
export * from '@data/interfaces/base.interface';

// ============ EXPORTAR MODELOS DE DATOS ============
export * from '@data/interfaces/data-models.interface';

// ============ EXPORTAR INTERFACES DE REQUESTS ============
export * from '@data/interfaces/api-requests.interface';

// ============ EXPORTAR INTERFACES DE RESPONSES ============
export * from '@data/interfaces/api-responses.interface';

// ============ RE-EXPORTACIONES ORGANIZADAS POR CATEGORÍA ============

// Authentication Requests
export type {LoginRequest, RegisterRequest, ChangePasswordRequest, ForgotPasswordRequest, ResetPasswordRequest} from '@data/interfaces/api-requests.interface';

// Authentication Responses
export type {LoginResponse, RegisterResponse, ChangePasswordResponse, ResetPasswordResponse, LogoutDeviceAuthResponse} from '@data/interfaces/api-responses.interface';

// User Requests
export type {StoreUserRequest, ProfileUpdateRequest} from '@data/interfaces/api-requests.interface';

// User Responses
export type {IndexUserResponse, ShowUserResponse, StoreUserResponse, ProfileUpdateResponse} from '@data/interfaces/api-responses.interface';

// Role Requests
export type {StoreRoleRequest} from '@data/interfaces/api-requests.interface';

// Role Responses
export type {IndexRoleResponse, ShowRoleResponse, UpdateStoreRoleResponse, IndexPermissionsResponse} from '@data/interfaces/api-responses.interface';

// Package Requests
export type {StoreUpdatePackageRequest} from '@data/interfaces/api-requests.interface';

// Package Responses
export type {ShowPackageResponse, StoreUpdatePackageResponse} from '@data/interfaces/api-responses.interface';

// Device Requests
export type {LogoutDeviceAuthRequest} from '@data/interfaces/api-requests.interface';

// Device Responses
export type {GetDeviceAuthListResponse} from '@data/interfaces/api-responses.interface';

// Invoice Responses
export type {IndexInvoicesResponse, ShowInvoiceResponse} from '@data/interfaces/api-responses.interface';

// Subscription Responses
export type {IndexSubscriptionsResponse} from '@data/interfaces/api-responses.interface';

// Wompi Responses
export type {GetWompiRegionsResponse} from '@data/interfaces/api-responses.interface';
