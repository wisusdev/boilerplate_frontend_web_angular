import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function metadataRequest(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const metadata = control.value;
		
		if(metadata === '') {
			return { metadataEmpty: true }; // inválido
		}

		try {
			const parsedMetadata = JSON.parse(metadata);

			if (parsedMetadata.packages && parsedMetadata.packages.length > 0) {
				return null; // válido si contiene al menos un package
			}
		} catch (e) {
			return { invalidJson: true }; // inválido si no es un JSON válido
		}

		return { metadataEmpty: true }; // inválido
	};
}
