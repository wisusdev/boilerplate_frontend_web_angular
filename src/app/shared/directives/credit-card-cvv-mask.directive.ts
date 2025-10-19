import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
	selector: '[creditCardCvvMask]',
	standalone: true
})
export class CreditCardCvvMaskDirective {

	constructor(private el: ElementRef) {
	}

	@HostListener('input', ['$event'])
	onInputChange(event: KeyboardEvent): void {
		const input = this.el.nativeElement;
		let value = input.value.replace(/\D/g, '');

		if (value.length > 4) {
			value = value.slice(0, 4);
		}

		input.value = value;
	}

}
