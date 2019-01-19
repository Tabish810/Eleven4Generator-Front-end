import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {HttpService} from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NavigateLoginService } from '../services/navigateLogin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-entry',
  templateUrl: './employee-entry.component.html',
  styleUrls: ['./employee-entry.component.css']
})
export class EmployeeEntryComponent implements OnInit {

  public input: any;
  public adminBankInput: any;
  public sendToBank: any;
  constructor(private http : HttpService,public toastMessages: ToastsManager,private router : Router,
    private navigateService : NavigateLoginService
    , vcr: ViewContainerRef) { 
      this.toastMessages.setRootViewContainerRef(vcr);
    this.input={
      employeeName : "",
      employeePassword:"",
      employeeCnic:"",
      employeeContact:"",
      employeeAdress:"",
      employeeAmount:"0",
      employeeJoinMonth:"",
      type:""
    };
   
  }
  
  newdata;
  insertEmployee(){
      var url = 'saveEmployeeEntry';
      this.http.addData(url,this.input).subscribe(data1 => {
        if(data1.statusCode === 200){
          this.toastMessages.success('Data Has been Saved!', 'Saved!');
          this.insertSendToBank(data1.newdata._id);
          this.router.navigate(['employee-list']);
        }
        else{
          this.toastMessages.error('Something went wrong!', 'Error!!');
        }
      },
        err => {
          console.log(err, "error");
        }
      )
    }
    insertSendToBank(id){
      var url = 'saveRecieved';
      this.adminBankInput = {
        from : this.input.employeeName,
        to: "Admin",
        recievedAmount: 0,
        empBankId : id
      };
      this.http.addData(url,this.adminBankInput).subscribe(data1 => {
        if(data1.statusCode === 200){
          this.toastMessages.success('Data Has been Saved!', 'Saved!');
        }
        else{
          this.toastMessages.error('Something went wrong!', 'Error!!');
        }
      },
        err => {
          console.log(err, "error");
        }
      )
    }

   

  ngOnInit() {
    this.navigateService.checkUser();
  }

}
