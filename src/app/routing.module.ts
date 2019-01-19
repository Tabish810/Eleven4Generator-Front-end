import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerEntryComponent } from './customer-entry/customer-entry.component';
import { EmployeeEntryComponent } from './employee-entry/employee-entry.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DefaulterListComponent } from './defaulter-list/defaulter-list.component';
import { FeeEntryComponent } from './fee-entry/fee-entry.component';
import { FeeListComponent } from './fee-list/fee-list.component';
import { EmployeeBankComponent } from './employee-bank/employee-bank.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { SuperBankComponent } from './super-bank/super-bank.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrintDataComponent } from './print-data/print-data.component';
import { LOCATION_INITIALIZED } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './header/header.component';
import { FilterPipe } from './pipes/feeListPipe.pipe';

import { SearchRecievedPipe } from './pipes/searchRecieved.pipe';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: FeeListComponent
  },
  {
    path: 'customer-entry',
    canActivate: [AuthGuard],
    component: CustomerEntryComponent
  },
  {
    path: 'employee-entry',
    canActivate: [AuthGuard],
    component: EmployeeEntryComponent
  },
  {
    path: 'customer-list',
    canActivate: [AuthGuard],
    component: CustomerListComponent
  },
  {
    path: 'employee-list',
    canActivate: [AuthGuard],
    component: EmployeeListComponent
  },
  {
    path: 'defaulter-list',
    canActivate: [AuthGuard],
    component: DefaulterListComponent
  },
  {
    path: 'print',
    canActivate: [AuthGuard],
    component: PrintDataComponent
  },
  {
    path: 'fee-entry',
    canActivate: [AuthGuard],
    component: FeeEntryComponent
  },
  {
    path: 'fee-list',
    canActivate: [AuthGuard],
    component: FeeListComponent
  },
  {
    path: 'employee-bank',
    component: EmployeeBankComponent
  },
  {
    path: 'admin-account',
    canActivate: [AuthGuard],
    component: AdminAccountComponent
  },
  {
    path: 'super-bank',
    canActivate: [AuthGuard],
    component: SuperBankComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [PrintDataComponent],
  exports: [RouterModule],
  declarations: [PrintDataComponent]
})
export class RoutingModuleModule { }
export const routingComponents = [
  LoginComponent, DashboardComponent, CustomerEntryComponent,
  EmployeeEntryComponent, CustomerListComponent, EmployeeListComponent,
  DefaulterListComponent, FeeEntryComponent, FeeListComponent,
  EmployeeBankComponent, AdminAccountComponent, SuperBankComponent,
  PageNotFoundComponent, HeaderComponent, FilterPipe, SearchRecievedPipe
];
