import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NavigateLoginService } from '../services/navigateLogin.service';
import { HttpService } from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {
  public input: any;
  constructor(private navigateService: NavigateLoginService,private router : Router,
  private http: HttpService, public toastMessages: ToastsManager
    , vcr: ViewContainerRef) {
    this.toastMessages.setRootViewContainerRef(vcr);
  }
  list;
  checkAmount = false;
  getBankEmployeeList() {
    let url = 'getAllRecieved';
    return this.http.getData(url).subscribe(data1 => {
      this.list = data1.data.newdata;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].recievedAmount > 0) {
          this.list[i].checkAmount = true;
        }
      }
    }, err => {
      console.log(err, "Oops It is an error");
    })
  }

  newdata;
  updateBankAmount(items) {
    var url = 'saveSend';
    this.input = {
      from: items.from,
      to: items.to,
      sendAmount: items.recievedAmount
    };
    this.http.addData(url, this.input).subscribe(data1 => {
      if (data1.statusCode === 200) {
        this.toastMessages.success('Amount has been sent to bank!', 'Saved!', 1000);
      }
      else {
        this.toastMessages.error('Something went wrong!', 'Error!!', { timeout: 2000 });
      }
    },
      err => {
        console.log(err, "error");
      }
    )
  }
  updateCurrent(items, id) {
    var url = 'updateCurrentRecievedAmount/' + id;
    const currentAmount = {
      recievedAmount : 0
    };
    this.http.editData(url,currentAmount).subscribe(data1 => {
      if (data1.statusCode !== 505) {
        this.toastMessages.success('Amount Has been Updated!', 'Updated!');
        // location.reload();
      }
      else {
        this.toastMessages.error('Error While Updating!', 'Error!!');
        console.log(data1, "Data not save")
      }
    },
      err => {
        console.log(err, "error")
      }
    )
  }
  updateLoginEmployees(items, id) {
    var url = 'employeeAmountUpdate/'+ id;
    const currentAmount = {
      employeeAmount : 0,
      check : true
    };
    this.http.editData(url, currentAmount).subscribe(data1 => {
      if (data1.statusCode !== 505) {
        this.toastMessages.success('Your Amount Has been Updated!', 'Updated!');
        this.router.navigate(['./super-bank']);
      }
      else {
        this.toastMessages.error('Error While Updating!', 'Error!!');
        console.log(data1, "Data not save")
      }
    },
      err => {
        console.log(err, "error")
      }
    )

  }
  updateBank(items) {
    this.updateBankAmount(items);
    this.updateCurrent(items,items._id);
    this.updateLoginEmployees(items,items.empBankId);
  }

  ngOnInit() {
    this.navigateService.checkUser();
    this.getBankEmployeeList();
  }

}
