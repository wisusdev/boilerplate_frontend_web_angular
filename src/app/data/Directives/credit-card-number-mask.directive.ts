import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[creditCardNumberMaskDirective]',
	standalone: true
})
export class CreditCardNumberMaskDirective {

	constructor(private el: ElementRef) {}

	@HostListener('input', ['$event'])
	onInputChange(event: KeyboardEvent): void {
		const input = this.el.nativeElement;
		let value = input.value.replace(/\D/g, '');

		const cardType = this.detectCardType(value);

		if (cardType === 'AMEX') {
			if (value.length > 15) {
				value = value.slice(0, 15);
			}
			input.value = value.replace(/(\d{4})(\d{6})(?=\d)/g, '$1 $2 ');
		} else {
			if (value.length > 16) {
				value = value.slice(0, 16);
			}
			input.value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
		}
	}

	public detectCardType(cardNumber: string): string {
		const patterns: { [key: string]: RegExp } = {
			VISA: /^4[0-9]{0,}$/,
			MASTERCARD: /^(5[1-5]|2[2-7])[0-9]{0,}$/,
			AMEX: /^3[47][0-9]{0,}$/,
			DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{0,}$/,
			JCB: /^(?:2131|1800|35\d{3})\d{0,}$/,
			DINERS: /^3(?:0[0-5]|[68][0-9])[0-9]{0,}$/
		};

		for (const card in patterns) {
			if (patterns[card].test(cardNumber)) {
				return card;
			}
		}
		return 'UNKNOWN';
	}
}
