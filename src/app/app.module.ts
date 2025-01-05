import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgOptimizedImage} from "@angular/common";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, withFetch, withInterceptors, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {headerTokenInterceptor} from '@data/interceptors/headerToken.interceptor';
import {formatRequestInterceptor} from "@data/interceptors/formatRequest.interceptor";
import {SidebarComponent} from "@views/layout/sidebar/sidebar.component";
import {NavbarComponent} from "@views/layout/navbar/navbar.component";

import {
	NgbCollapse,
	NgbDropdown,
	NgbDropdownItem,
	NgbDropdownMenu,
	NgbDropdownToggle,
	NgbPaginationModule
} from "@ng-bootstrap/ng-bootstrap";
import {ToastComponent} from "@views/shared/toast/toast.component";
import {ThemeComponent} from "@views/shared/theme/theme.component";
import {AccountMenuListComponent} from "@views/account/account-menu-list/account-menu-list.component";

@NgModule({
	declarations: [
		AppComponent
	],
	exports: [],
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpTranslateLoader,
				deps: [HttpClient]
			}
		}),
		AppRoutingModule,
		ToastComponent,
		ThemeComponent,
		ReactiveFormsModule,
		FormsModule,
		NgbDropdown,
		NgbDropdownToggle,
		NgbDropdownItem,
		NgbDropdownMenu,
		NgbCollapse,
		NgOptimizedImage,
		NgbPaginationModule,
		AccountMenuListComponent,
		SidebarComponent,
		NavbarComponent
	],
	providers: [
		provideHttpClient(withFetch(), withInterceptors([
			headerTokenInterceptor,
			formatRequestInterceptor
		])),
		provideHttpClient(withInterceptorsFromDi())
	]
})
export class AppModule {
}

export function httpTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http);
}
