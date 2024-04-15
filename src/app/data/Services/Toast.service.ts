import {Injectable} from '@angular/core';

export interface Toast {
	message: string;
	classname?: string;
	delay?: number;
}

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	toasts: Toast[] = [];

	show(toast: Toast) {
		toast.classname = toast.classname || 'bg-success text-light';
		toast.delay = toast.delay || 5000;
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
