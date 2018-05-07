import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NavigateLoginService } from '../services/navigateLogin.service';
import { HttpService } from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SearchRecievedPipe } from '../pipes/searchRecieved.pipe';

@Component({
  selector: 'app-super-bank',
  templateUrl: './super-bank.component.html',
  styleUrls: ['./super-bank.component.css']
})
export class SuperBankComponent implements OnInit {
  searchMonth = '';
  public list: any;
  constructor(private navigateService: NavigateLoginService,
    private http: HttpService, public toastMessages: ToastsManager
    , vcr: ViewContainerRef) {
    this.toastMessages.setRootViewContainerRef(vcr);
  }
  getBankRecievedList() {
    let url = 'getAllSends';
    return this.http.getData(url).subscribe(data1 => {
      this.list = data1.data;
    }, err => {
      console.log(err, "Oops It is an error");
    })
  }
  ngOnInit() {
    this.navigateService.checkUser();
    this.getBankRecievedList();
  }

}
