import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { environment } from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = environment.APP_NAME;
}
