import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {ToastService} from "../../../../data/Services/Toast.service";
import {Handle} from "../../../../data/Exceptions/Handle";
import {catchError, tap} from "rxjs";

@Component({
	selector: 'app-device-connected',
	templateUrl: './device-connected.component.html',
})
export class DeviceConnectedComponent implements OnInit {
	constructor(private accountService: AccountService, private toast: ToastService, private handleMessage: Handle) {}

	devices: any = [];
	totalPages: number = 0;
	pageNumber: number = 1;
	pages: number[] = [];

	ngOnInit(): void {
		this.getDevices();
	}

	getDevices() {
		let data = {
			page: this.pageNumber
		}

		this.accountService.getDeviceAuthList(data).pipe(
			tap((data: any) => {
				this.devices = data.data;
				this.totalPages = data.data.last_page;
				this.pageNumber = data.data.current_page;
				this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
			}),
			catchError(this.handleMessage.errorHandle)
		).subscribe();
	}

	setPage(pageNumber: number): void {
		this.pageNumber = pageNumber;
		this.getDevices();
	}
}
