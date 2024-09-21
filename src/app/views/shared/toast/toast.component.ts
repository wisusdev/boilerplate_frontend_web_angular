import {Component, inject} from '@angular/core';
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {NgTemplateOutlet} from "@angular/common";
import {ToastService} from "@data/Services/toast.service";

@Component({
	selector: 'app-toast',
    standalone: true,
    imports: [NgbToastModule, NgTemplateOutlet],
    templateUrl: './toast.component.html',
    host: { class: 'toast-container position-fixed bottom-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastComponent {
    toastService = inject(ToastService);
}
