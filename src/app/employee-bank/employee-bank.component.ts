import { Component, OnInit, ViewContainerRef, ElementRef, Renderer } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-bank',
  templateUrl: './employee-bank.component.html',
  styleUrls: ['./employee-bank.component.css']
})
export class EmployeeBankComponent implements OnInit {
  updateCheckButton: { check: boolean; };
  public localData: any = [];
  name: any = [];
  empId;
  constructor(private http: HttpService, public toastMessages: ToastsManager
    , vcr: ViewContainerRef,private router : Router,
     private renderer: Renderer, private elemRef: ElementRef) {
    this.toastMessages.setRootViewContainerRef(vcr);
    this.localData = JSON.parse(localStorage.getItem("user"));
    for (let i = 0; i < this.localData.length; i++) {
      this.name = this.localData[i].name;
      this.empId = this.localData[i].id;
      this.getEmployeeById(this.empId);
    }
  }
  loginEmployeeDetails;
  empAmount;
  sendId;
  sendBtuttonCheck;
  getEmployeeById(id) {
    let url = 'getemployeeNameById/' + id;
    return this.http.getData(url).subscribe(data1 => {
      this.loginEmployeeDetails = data1.data;
      this.empAmount = this.loginEmployeeDetails.employeeAmount;
      this.sendId = data1.data._id;
      this.checkButton = data1.data.check;

    }, err => {
      console.log(err, "Oops It is an error");
    })
  }

  onCheck() {
    this.updateChech(this.sendId, this.loginEmployeeDetails);
    this.onSendAmount(this.sendId,this.empAmount);
  }
  checkButton;
  updateChech(id, items) {
    if (this.empAmount > 0) {
      var url = 'employeeButtonCheck/' + id;
      this.updateCheckButton = {
        check: false
      };
      this.http.editData(url, this.updateCheckButton).subscribe(data1 => {
        if (data1.statusCode !== 505) {
          this.toastMessages.success('Button has been pressed', 'Pressed');
          this.checkButton = data1.data.check;
          // location.reload();
          this.router.navigate(['./customer-list']);
        }
        else {
          this.toastMessages.error('Error While Pressing!', 'Error!!');
        }
      },
        err => {
          console.log(err, "error")
        }
      )
    }else{
      this.toastMessages.error('You have No Money!', 'Error!!');
    }
  }
  onSendAmount(id,camount) {
    if (this.empAmount > 0) {
    var url = 'updateRecievedAmount/'+ id;
    let updateRecievedAmount = {
      recievedAmount : camount
    };
    this.http.editData( url, updateRecievedAmount ).subscribe(data1 => {
      if (data1.statusCode !== 505) {
        this.toastMessages.success('Your amount has been sent', 'Transfered');
      }
      else {
        this.toastMessages.error('Error While Pressing!', 'Error!!');
      }
    },
      err => {
        console.log(err, "error")
      }
    )
  } else{
    this.toastMessages.error('Dont Press', 'Danger');
  }
}
  
  ngOnInit() {

  }

}
