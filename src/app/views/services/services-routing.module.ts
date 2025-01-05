import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexPackageComponent} from "./packages/index/indexPackage.component";
import {IndexSubscriptionComponent} from "./subscriptions/index/indexSubscription.component";
import {authGuard} from "@data/guards/auth.guard";
import {IndexInvoiceComponent} from "@views/services/invoices/index/indexInvoice.component";
import {CreateSubscriptionComponent} from "@views/services/subscriptions/create/createSubscription.component";
import {ShowInvoiceComponent} from "@views/services/invoices/show/showInvoice.component";
import {PermissionGuard} from "@data/guards/permission.guard";

const routes: Routes = [
	{path: 'services/packages', component: IndexPackageComponent, canActivate: [authGuard, PermissionGuard], data: {permissions: 'packages:index'}},
	{path: 'services/subscriptions', component: IndexSubscriptionComponent, canActivate: [authGuard, PermissionGuard], data: {permissions: 'subscriptions:index'}},
	{path: 'services/subscriptions/create', component: CreateSubscriptionComponent, canActivate: [authGuard, PermissionGuard], data: {permissions: 'subscriptions:create'}},
	{path: 'services/invoices', component: IndexInvoiceComponent, canActivate: [authGuard, PermissionGuard], data: {permissions: 'invoices:index'}},
	{path: 'services/invoices/show/:id', component: ShowInvoiceComponent, canActivate: [authGuard, PermissionGuard], data: {permissions: 'invoices:show'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
