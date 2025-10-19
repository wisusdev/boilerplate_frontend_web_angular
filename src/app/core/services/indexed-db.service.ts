import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class IndexedDBService {
	private dbName = 'AppSettingsDB';
	private storeName = 'settings';

	constructor() {
		this.initDB();
	}

	private initDB() {
		const request = indexedDB.open(this.dbName, 1);

		request.onupgradeneeded = (event: any) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(this.storeName)) {
				db.createObjectStore(this.storeName, {keyPath: 'id'});
			}
		};

		request.onerror = (event) => {
			console.error('IndexedDB error:', event);
		};
	}

	saveData(data: any) {
		console.log('data', data);
		const {type, ...filteredData} = data;
		const request = indexedDB.open(this.dbName, 1);
		
		request.onsuccess = (event: any) => {
			const db = event.target.result;
			const transaction = db.transaction([this.storeName], 'readwrite');
			const store = transaction.objectStore(this.storeName);
			store.put(filteredData);
		};

		request.onerror = (event) => {
			console.error('IndexedDB error:', event);
		};
	}

	getData(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, 1);

			request.onsuccess = (event: any) => {
				const db = event.target.result;
				const transaction = db.transaction([this.storeName], 'readonly');
				const store = transaction.objectStore(this.storeName);
				const getRequest = store.get(id);

				getRequest.onsuccess = (event: any) => {
					resolve(event.target.result);
				};

				getRequest.onerror = (event: Event) => {
					reject(`IndexedDB error: ${event}`);
				};
			};

			request.onerror = (event: Event) => {
				reject(`IndexedDB error: ${event}`);
			};
		});
	}
}
