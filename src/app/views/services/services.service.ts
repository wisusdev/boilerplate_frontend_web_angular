import {Injectable} from '@angular/core';
import {Api} from "../../config/Api";
import {HttpClient} from "@angular/common/http";
import {Handle} from "../../data/Exceptions/Handle";
import {catchError, Observable} from "rxjs";
import {IndexPackageRequestInterface} from "../../data/Interfaces/Requests/indexPackageRequest.interface";

@Injectable({
	providedIn: 'root'
})
export class ServicesService {
	private _apiUri: string = Api.api_url_v1;
	private _apiUriPackage: string = this._apiUri + '/packages';

	constructor(
		private httpClient: HttpClient,
		private handleMessage: Handle
	) {}

	indexServices(): Observable<IndexPackageRequestInterface> {
		return this.httpClient.get<IndexPackageRequestInterface>(`${this._apiUriPackage}`, {
			headers: Api.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	createService(data: any): Observable<any> {
		return this.httpClient.post(`${this._apiUriPackage}`, data, {
			headers: Api.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}

	updateService(data: any): Observable<any> {
		return this.httpClient.put(`${this._apiUriPackage}/${data.id}`, data, {
			headers: Api.headers,
		}).pipe(catchError(this.handleMessage.errorHandle));
	}
}
