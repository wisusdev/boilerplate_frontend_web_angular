import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@Component({
	selector: 'app-item-form',
	standalone: true,
	imports: [
		TranslateModule,
		FormsModule
	],
	templateUrl: './item-form.component.html'
})
export class ItemFormComponent {
	quantity: number = 0;
	@Input() index!: number;

	@Output() quantityChange = new EventEmitter<number>();
	@Output() remove = new EventEmitter<void>();

	onQuantityChange() {
		this.quantityChange.emit(this.quantity);
	}

	removeItem() {
		this.remove.emit();
	}
}
