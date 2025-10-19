import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgOptimizedImage} from "@angular/common";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, withFetch, withInterceptors, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SidebarComponent} from "@layout/sidebar/sidebar.component";
import {NavbarComponent} from "@layout/navbar/navbar.component";

import {
	NgbCollapse,
	NgbDropdown,
	NgbDropdownItem,
	NgbDropdownMenu,
	NgbDropdownToggle,
	NgbPaginationModule
} from "@ng-bootstrap/ng-bootstrap";
import {ToastComponent} from "@shared/components/toast/toast.component";
import {ThemeComponent} from "@shared/components/theme/theme.component";
import {AccountMenuListComponent} from "@features/account/components/account-menu-list/account-menu-list.component";
import { headerTokenInterceptor } from '@core/interceptors/header-token.interceptor';
import { formatRequestInterceptor } from '@core/interceptors/format-request.interceptor';
import { CoreModule } from '@core/core.module';

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
		CoreModule, // Módulo Core - debe importarse primero
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
