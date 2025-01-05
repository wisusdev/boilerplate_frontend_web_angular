import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {CreditCardNumberMaskDirective} from "@data/directives/credit-card-number-mask.directive";

export class WompiRequest {
	static creditCardNumber(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value.replace(/\s+/g, '');
			if (!/^\d{13,19}$/.test(value)) {
				return { invalidCreditCardNumber: true };
			}
			return WompiRequest.luhnCheck(value) ? null : { invalidCreditCardNumber: true };
		};
	}

	static creditCardNumberWithMask(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value.replace(/\D/g, '');
			let maxLength = 19;

			const directive = new CreditCardNumberMaskDirective({ nativeElement: { value: value } });
			const cardType = directive.detectCardType(value.replace(/\D/g, ''));

			switch (cardType) {
				case 'VISA':
				case 'MASTERCARD':
				case 'DISCOVER':
				case 'JCB':
				case 'DINERS':
					maxLength = 16;
					break;
				case 'AMEX':
					maxLength = 15;
					break;
			}

			const  trimmedValue = value.slice(0, maxLength);

			return WompiRequest.luhnCheck(trimmedValue) ? null : { invalidCreditCardNumber: true };
		};
	}

	private static luhnCheck(cardNumber: string): boolean {
		let sum = 0;
		let shouldDouble = false;
		for (let i = cardNumber.length - 1; i >= 0; i--) {
			let digit = parseInt(cardNumber.charAt(i), 10);
			if (shouldDouble) {
				digit *= 2;
				if (digit > 9) {
					digit -= 9;
				}
			}
			sum += digit;
			shouldDouble = !shouldDouble;
		}
		return sum % 10 === 0;
	}

	static cvv(control: AbstractControl): ValidationErrors | null {
		const value = control.value;
		const isValid = /^[0-9]{3,4}$/.test(value);
		return isValid ? null : { invalidCVV: true };
	}
}
