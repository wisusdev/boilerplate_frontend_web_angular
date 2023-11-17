// Angular modules
import { LOCATION_INITIALIZED } from '@angular/common';
import { Injector }             from '@angular/core';

// External modules
import { TranslateService }     from '@ngx-translate/core';
import { firstValueFrom }       from 'rxjs';

// Helpers
// import { StorageHelper }        from '@helpers/storage.helper';

// Internal modules
import {environment} from '@env/environment';

/**
 * Safely use translate.instant()
 * https://github.com/ngx-translate/core/issues/517
 */
export function appInitFactory(translate : TranslateService, injector : Injector) : () => Promise<void>
{
	return () => new Promise<void>((resolve, reject) =>
	{
		const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve());
		locationInitialized.then(async (_ : any) =>
		{
			// NOTA Este idioma se utilizará como alternativa cuando no se encuentre una traducción en el idioma actual.
			const defaultLanguage = environment.defaultLanguage;
			//const defaultLanguage = 'en';
			translate.setDefaultLang(defaultLanguage);
			// NOTA El lang a usar, si el lang no está disponible, usará el cargador actual para obtenerlos
			// let userLanguage = StorageHelper.getLanguage();
			// if (!userLanguage)
			let userLanguage = defaultLanguage;

			const obs = translate.use(userLanguage);
			try {
				await firstValueFrom(obs);
				console.info(`Successfully initialized '${userLanguage}' language.`);
			} catch (error) {
				console.error(`Problem with '${userLanguage}' language initialization.`);
			}
			return resolve();
		});
	});
}
