import {Component} from '@angular/core';
import {PublicServicesComponent} from "../services/public-services.component";

@Component({
	selector: 'app-welcome',
	standalone: true,
	imports: [
		PublicServicesComponent
	],
	templateUrl: './welcome.component.html'
})
export class WelcomeComponent {

}
