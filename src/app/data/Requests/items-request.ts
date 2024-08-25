import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function itemsRequest(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const items = control.value;

		if (!Array.isArray(items) || items.length <= 0) {
			return { metadataEmpty: true }; // inválido si no es un array o tiene uno o menos elementos
		}

		const invalidItems = items.filter(item => {
			return !item.item_id || !item.type || !item.description || !item.quantity || !item.unit_price || !item.total_price || !item.interval;
		});

		if (invalidItems.length) {
			return { metadataInvalid: true }; // inválido si hay elementos inválidos
		}

		return null; // válido
	};
}
