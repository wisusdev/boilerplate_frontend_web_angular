import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexPackageComponent} from "./packages/index/indexPackage.component";
import {IndexSubscriptionComponent} from "./subscriptions/index/indexSubscription.component";
import {authGuard} from "@data/Guards/auth.guard";
import {IndexInvoiceComponent} from "@views/services/invoices/index/indexInvoice.component";
import {CreateSubscriptionComponent} from "@views/services/subscriptions/create/createSubscription.component";
import {ShowInvoiceComponent} from "@views/services/invoices/show/showInvoice.component";
import {permissionGuard} from "@data/Guards/permission.guard";

function createRoute(path: string, component: any, permissions: string) {
	return {
		path,
		component,
		canActivate: [authGuard, permissionGuard],
		data: { permissions }
	};
}

const routes: Routes = [
	{
		path: 'services',
		children: [
			createRoute('packages', IndexPackageComponent, 'packages:index'),
			createRoute('subscriptions', IndexSubscriptionComponent, 'subscriptions:index'),
			createRoute('subscriptions/create', CreateSubscriptionComponent, 'subscriptions:create'),
			createRoute('invoices', IndexInvoiceComponent, 'invoices:index'),
			createRoute('invoices/show/:id', ShowInvoiceComponent, 'invoices:show')
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
