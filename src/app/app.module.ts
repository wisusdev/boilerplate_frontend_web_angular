import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgOptimizedImage} from "@angular/common";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {headerTokenInterceptor} from './data/Interceptors/headerToken.interceptor';
import {formatRequestInterceptor} from "./data/Interceptors/formatRequest.interceptor";
import {LoginComponent} from "./views/auth/login/login.component";
import {RegisterComponent} from "./views/auth/register/register.component";
import {ForgotPasswordComponent} from "./views/auth/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./views/auth/reset-password/reset-password.component";
import {ProfileComponent} from "./views/account/profile/profile.component";
import {ChangePasswordComponent} from "./views/account/change-password/change-password.component";
import {DeviceConnectedComponent} from "./views/account/device-connected/device-connected.component";
import {AccountMenuListComponent} from "./views/account/account-menu-list/account-menu-list.component";
import {SidebarComponent} from "./views/layout/sidebar/sidebar.component";
import {NavbarComponent} from "./views/layout/navbar/navbar.component";

import {
	NgbCollapse,
	NgbDropdown,
	NgbDropdownItem,
	NgbDropdownMenu,
	NgbDropdownToggle,
	NgbPaginationModule
} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationDialogComponent} from "./views/shared/confirmation-dialog/confirmation-dialog.component";
import {ToastComponent} from "./views/shared/toast/toast.component";
import {ThemeComponent} from "./views/shared/theme/theme.component";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent,
		ProfileComponent,
		ChangePasswordComponent,
		DeviceConnectedComponent,
		ConfirmationDialogComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
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
		provideHttpClient(
			withFetch(),
			withInterceptors([
				headerTokenInterceptor,
				formatRequestInterceptor
			])
		)
	],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}

export function httpTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http);
}
