import {Component, EventEmitter, Output} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@Component({
	selector: 'app-item-form',
	standalone: true,
	imports: [
		TranslateModule,
		FormsModule
	],
	templateUrl: './item-form.component.html',
	styleUrl: './item-form.component.css'
})
export class ItemFormComponent {
	quantity: number = 0;

	@Output() quantityChange = new EventEmitter<number>();

	onQuantityChange() {
		this.quantityChange.emit(this.quantity);
	}
}
