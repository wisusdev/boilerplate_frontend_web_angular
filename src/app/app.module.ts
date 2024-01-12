import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./resources/views/shared/navbar/navbar.component";
import { ToastComponent } from "./resources/components/toast/toast.component";
import { ThemeComponent } from "./resources/components/theme/theme.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ResetPasswordComponent } from './resources/views/auth/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./resources/views/auth/login/login.component";
import { RegisterComponent } from "./resources/views/auth/register/register.component";
import { ForgotPasswordComponent } from "./resources/views/auth/forgot-password/forgot-password.component";
import { ProfileComponent } from "./resources/views/profile/profile.component";
import {
	NgbCollapse,
	NgbDropdown,
	NgbDropdownItem,
	NgbDropdownMenu,
	NgbDropdownToggle
} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent,
		NavbarComponent,
		ProfileComponent
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
		NgbCollapse
	],
	providers: [
		provideClientHydration()
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}

export function httpTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http);
}
