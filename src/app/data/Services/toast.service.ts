import {Injectable} from '@angular/core';

export interface Toast {
	message: string;
	className?: string;
	delay?: number;
}

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	toasts: Toast[] = [];

	show(toast: Toast) {
		toast.className = toast.className || 'bg-success text-light';
		toast.delay = toast.delay || 5000;
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}

	success(message: string) {
		this.show({message, className: 'bg-success text-light'});
	}

	danger(message: string) {
		this.show({message, className: 'bg-danger text-light'});
	}

	warning(message: string) {
		this.show({message, className: 'bg-warning text-light'});
	}

	info(message: string) {
		this.show({message, className: 'bg-info text-light'});
	}

	primary(message: string) {
		this.show({message, className: 'bg-primary text-light'});
	}
}
