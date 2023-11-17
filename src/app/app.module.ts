import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AppRoutingModule} from "./app-routing.module";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {appInitFactory} from "./shared/factories/app-init.factory";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LoginComponent,
		RegisterComponent,
		ProfileComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		NgbCollapse,
		TranslateModule.forRoot({
			loader:
				{
					provide: TranslateLoader,
					useFactory: (createTranslateLoader),
					deps: [HttpClient]
				}
		})
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: appInitFactory,
			deps: [TranslateService, Injector],
			multi: true
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
