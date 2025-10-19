import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CoreModule - Singleton Module
 * 
 * Este módulo contiene servicios singleton, guards, interceptors y otras
 * dependencias que deben instanciarse una sola vez en toda la aplicación.
 * 
 * Debe importarse ÚNICAMENTE en AppModule.
 * 
 * Contiene:
 * - Guards (auth, guest, permission)
 * - Interceptors (header-token, format-request)
 * - Services singleton (auth, permission, toast, theme, etc.)
 * - Providers (Auth)
 * - Exception handlers
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // Los servicios con providedIn: 'root' se registran automáticamente
    // No es necesario agregarlos aquí
  ]
})
export class CoreModule {
  /**
   * Constructor que previene múltiples importaciones de CoreModule
   * Lanza un error si se intenta importar CoreModule más de una vez
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule ya ha sido cargado. Importa CoreModule únicamente en AppModule.'
      );
    }
  }
}
