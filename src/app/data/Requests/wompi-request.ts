import {AbstractControl, ValidationErrors} from "@angular/forms";

export class WompiRequest {
	static creditCardNumber(control: AbstractControl): ValidationErrors | null {
		const value = control.value.replace(/\s+/g, '');
		const isValid = /^[0-9]{16}$/.test(value);
		return isValid ? null : { invalidCreditCardNumber: true };
	}

	static cvv(control: AbstractControl): ValidationErrors | null {
		const value = control.value;
		const isValid = /^[0-9]{3,4}$/.test(value);
		return isValid ? null : { invalidCVV: true };
	}
}
