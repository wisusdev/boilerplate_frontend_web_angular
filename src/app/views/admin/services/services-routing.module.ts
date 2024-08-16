import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexPackageComponent} from "./packages/index/indexPackage.component";
import {IndexSubscriptionComponent} from "./subscriptions/index/indexSubscription.component";
import {authGuard} from "@data/Guards/Auth.guard";
import {IndexInvoiceComponent} from "@views/admin/services/invoices/index/indexInvoice.component";

const routes: Routes = [
	{path: 'services/packages', component: IndexPackageComponent, canActivate: [authGuard], data: {permissions: 'packages.index'}},
	{path: 'services/subscriptions', component: IndexSubscriptionComponent, canActivate: [authGuard], data: {permissions: 'subscriptions.index'}},
	{path: 'services/invoices', component: IndexInvoiceComponent, canActivate: [authGuard], data: {permissions: 'invoices.index'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
