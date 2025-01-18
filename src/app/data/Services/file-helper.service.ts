import {Injectable} from '@angular/core';
import {Handle} from '@data/Exceptions/handle';
import {environment} from "@env/environment";

@Injectable({
	providedIn: 'root'
})
export class FileHelperService {
	allowedTypes = environment.allowImageTypes;

	constructor(
		private handleMessage: Handle
	) {}

	handleFileSelection(event: any, callback: (base64: string) => void) {
		let selectImage = <File>event.target.files[0];

		if (selectImage.size > environment.allowImageSize) {
			this.handleMessage.handleError('File size is too large');
			event.target.value = '';
			return;
		}

		if (!this.allowedTypes.includes(selectImage.type)) {
			this.handleMessage.handleError('Invalid file type');
			event.target.value = '';
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			let base64String = reader.result as string;
			callback(base64String);
		};

		reader.readAsDataURL(selectImage);
	}
}
