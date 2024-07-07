import {Component} from '@angular/core';
import {PublicPackagesComponent} from "../services/package/public-packages.component";

@Component({
	selector: 'app-welcome',
	standalone: true,
	imports: [
		PublicPackagesComponent
	],
	templateUrl: './welcome.component.html'
})
export class WelcomeComponent {

}
