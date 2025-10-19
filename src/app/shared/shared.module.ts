import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Componentes compartidos
import { ToastComponent } from '@shared/components/toast/toast.component';
import { ThemeComponent } from '@shared/components/theme/theme.component';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

// Directivas compartidas
import { CreditCardNumberMaskDirective } from '@shared/directives/credit-card-number-mask.directive';
import { CreditCardCvvMaskDirective } from '@shared/directives/credit-card-cvv-mask.directive';

/**
 * SharedModule
 * 
 * Este módulo contiene componentes, directivas y pipes reutilizables
 * que pueden ser importados en múltiples feature modules.
 * 
 * Contiene:
 * - Componentes UI reutilizables (toast, modal, pagination, etc.)
 * - Directivas compartidas (máscaras de tarjetas, etc.)
 * - Pipes personalizados
 * - Validators personalizados
 * - Utilities compartidas
 * 
 * Puede importarse en cualquier feature module que lo necesite.
 */
@NgModule({
  declarations: [
    // Declarar aquí componentes y directivas NO standalone
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Componentes standalone
    ToastComponent,
    ThemeComponent,
    ConfirmationDialogComponent,
    // Directivas standalone
    CreditCardNumberMaskDirective,
    CreditCardCvvMaskDirective
  ],
  exports: [
    // Exportar módulos comunes para que los feature modules no tengan que importarlos
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    // Exportar componentes standalone
    ToastComponent,
    ThemeComponent,
    ConfirmationDialogComponent,
    
    // Exportar directivas standalone
    CreditCardNumberMaskDirective,
    CreditCardCvvMaskDirective
  ]
})
export class SharedModule { }
