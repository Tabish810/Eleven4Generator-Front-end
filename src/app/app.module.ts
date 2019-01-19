
//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModuleModule, routingComponents } from './routing.module';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Declare Components 
import { AppComponent } from './app.component';
//services
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { CalculationService } from './services/calculation.service';
import { CalculationCustomerService } from './services/calculationCustomerList.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NavigateLoginService } from './services/navigateLogin.service';
import { DataPassingService } from './services/dataPassing.service';
import { CustomerListPipe } from './pipes/customer-list.pipe';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    CustomerListPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModuleModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    HttpService,
    CalculationService,
    CalculationCustomerService,
    AuthService, AuthGuard,
    NavigateLoginService,
    DataPassingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
