import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {HttpService} from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {FilterPipe} from '../pipes/feeListPipe.pipe';
import { NavigateLoginService } from '../services/navigateLogin.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public recordsId : any;
  public inputModal : any;
  searchableList : any = [];
  queryString;
  constructor(private http : HttpService,public toastMessages: ToastsManager
    , vcr: ViewContainerRef, private navigateService : NavigateLoginService ) {
    this.toastMessages.setRootViewContainerRef(vcr);
 
    this.inputModal={
      employeeName : "",
      employeePassword:"",
      employeeCnic : "",
      employeeContact : "",
      employeeAdress:"",
      employeeJoinMonth : "",
      type : "",
    }
    this.queryString = '';
    this.searchableList = ['employeeName','employeeCnic','employeeContact','employeePassword'] ;

  } 

  url = 'getAllEmployees';
  list;
  getEmployeeList(){
    return this.http.getData(this.url).subscribe(data1=>{
      this.list = data1.data;
    },err=>{
      console.log(err,"Oops It is an error");
    })
  }

  deleteEmployeeData(id,index){
      var url = 'deleteEmployees/'+id;
      this.http.deleteData(url).subscribe(data1 => {
       if(data1.statusCode === 200){
        this.toastMessages.success('Data Has been Deleted!', 'Deleted!');
        this.list.splice(index, 1);
       }
       else{
        this.toastMessages.error('Error While Deleting!', 'Deleted!');
       }
       
      },
        err => {
          console.log(err, "error")
        }
      )
    }

onClick(item,index){
  this.deleteEmployeeData(item._id,index);
}

    // updating Records
    onUpdate(items){
      this.inputModal.employeeName = items.employeeName;
      this.inputModal.employeePassword = items.employeePassword;
      this.inputModal.employeeCnic = items.employeeCnic;
      this.inputModal.employeeContact = items.employeeContact;
      this.inputModal.employeeAdress = items.employeeAdress;
      this.inputModal.employeeJoinMonth = items.employeeJoinMonth;
      this.inputModal.type = items.type;
      this.recordsId  = items._id;
    }
    editPopUpRecords(){
      this.updateModalRecords(this.recordsId , this.inputModal);
    }
    updateModalRecords(id,items){
      var url = 'employeeEntryUpdate/'+id;
      this.http.editData(url,items).subscribe(data1 => { 
        if(data1.statusCode !== 505){
          this.toastMessages.success('Data Has been Updated!', 'Updated!');
          location.reload();
        }
        else{
          this.toastMessages.error('Error While Updating!', 'Error!!');
        }
     },
      err => {
        console.log(err, "error")
      }
    )
  }

 // delete from bank
 deleteBankData(item,index){
  var url = 'deletFromBank/'+item._id;
  this.http.deleteData(url).subscribe(data1 => {
   if(data1.statusCode === 200){
    this.toastMessages.success('Data Has been Deleted!', 'Deleted!');
   }
   else{
    this.toastMessages.error('Error While Deleting!', 'Error!!');
   }
   
  },
    err => {
      console.log(err, "error")
    }
  )
}




  ngOnInit() {
  this.getEmployeeList();
  this.navigateService.checkUser();
}

}
