import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DataPassingService } from '../services/dataPassing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee-entry',
  templateUrl: './fee-entry.component.html',
  styleUrls: ['./fee-entry.component.css']
})
export class FeeEntryComponent implements OnInit {
  dummyList2: any = [];
  public getdata: any = [];
  public input: any;
  public input2: any;
  public localData: any = [];
  name: any = [];
  empId;

  constructor(private http: HttpService, public toastMessages: ToastsManager
    , vcr: ViewContainerRef, private catchData: DataPassingService,
    private router: Router) {
    this.toastMessages.setRootViewContainerRef(vcr);
    this.localData = JSON.parse(localStorage.getItem("user"));
    for (let i = 0; i < this.localData.length; i++) {
      this.name = this.localData[i].name;
      this.empId = this.localData[i].id;
      this.getEmployeeById(this.empId);
    }
    this.input = {
      id_number: "",
      name: this.cname,
      panel: "",
      phone_no: "",
      month_date: "",
      paid: "",
      street_no: "",
      ampere: "",
      amount: "",
      balance: "0"
    };
    this.input2 = {
      employeeAmount: "",
    };
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
      this.sendBtuttonCheck = data1.data.check;
    }, err => {
      console.log(err, "Oops It is an error");
    })
  }
  newdata;
  dataArray: any = [];
  dataVarId: any;
  amountValue: any;
  list: any = [];
  dummyList: any = [];
  checkFound = true;
  employeeEntryUrl = 'getAllEmployees';
  insertFee() {
    var mlist = [ "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December" ];
    var url = 'customerFeeEntry';
    var mydate = new Date();
    if (this.dummyList.length == 0) {
      console.log(this.dummyList)
      console.log(this.dummyList.length);
      this.http.addData(url, this.input).subscribe(data1 => {
        if (data1.statusCode === 200) {
          this.toastMessages.success('Fee has been entered!', 'Saved!');
          this.dataArray = JSON.parse(localStorage.getItem("user"))
          for (let i = 0; i < this.dataArray.length; i++) {
            this.dataVarId = this.dataArray[i].id;
          }

          this.http.getData(this.employeeEntryUrl).subscribe(employeeEntryData => {
            // this.list.push( employeeEntryData.data);
            this.list = employeeEntryData.data;
            for (let i = 0; i < this.list.length; i++) {
              if (this.list[i]._id === this.dataVarId) {
                this.input2.employeeAmount = this.list[i].employeeAmount;
                this.updateLoginAmount(this.dataVarId, this.input2.employeeAmount);
              }
            }
          }, err => {
            console.log(err, "Oops It is an error");
          })
        }
        else {
          this.toastMessages.error('Something went wrong!', 'Error!!');
        }
      },
        err => {
          console.log(err, "error");
        }
      )

    }
    
    if (this.dummyList.length > 0) {
      for (let i = 0; i < this.dummyList.length; i++) {
        if (this.dummyList[i].phone_no == this.input.phone_no &&
           this.dummyList[i].month == mlist[mydate.getMonth()] && 
           this.dummyList[i].year == `${mydate.getFullYear()}` && 
           this.dummyList[i].id_number == this.input.id_number
          ) {
          this.checkFound = false;
        }
      }
      if (!this.checkFound) {
        this.toastMessages.error('Already Paid!', 'Error!!');
      } else if (this.checkFound) {
        this.http.addData(url, this.input).subscribe(data1 => {
          if (data1.statusCode === 200) {
            this.toastMessages.success('Fee Entered Successfully!', 'Entered!');
            this.dataArray = JSON.parse(localStorage.getItem("user"))
            for (let i = 0; i < this.dataArray.length; i++) {
              this.dataVarId = this.dataArray[i].id;
            }
            this.http.getData(this.employeeEntryUrl).subscribe(employeeEntryData => {
              this.list = employeeEntryData.data;
              for (let i = 0; i < this.list.length; i++) {
                if (this.list[i]._id === this.dataVarId) {
                  this.input2.employeeAmount = this.list[i].employeeAmount;
                  this.updateLoginAmount(this.dataVarId, this.input2.employeeAmount);
                }
              }
            }, err => {
              console.log(err, "Oops It is an error");
            })
          }
          else {
            this.toastMessages.error('Something went wrong!', 'Error!!');
          }
        },
          err => {
            console.log(err, "error");
          }
        )
      }
    }

  }
  // take out data of all customers
  feeButton = false;
  getCustomersData() {
    var url = 'getAllCustomerFee';
    this.http.getData(url).subscribe(data => {
      this.getdata = data.data;
      this.dummyList = this.getdata;
      this.toastMessages.success('Ready for fee entry', 'Ready!');
      this.feeButton= true;
      // console.log(this.dummyList);
    }, err => {
      console.log(err, 'ERROR');
    });
  }

  updateLoginAmount(id, empAmount) {
    let paidAmount = empAmount;
    paidAmount += this.input.paid;
    var amountDummyObject = {
      employeeAmount: paidAmount,
      check: true
    };
    var url = 'employeeAmountUpdate/' + id;
    this.http.editData(url, amountDummyObject).subscribe(data1 => {
      if (data1.statusCode !== 505) {
        this.toastMessages.success('Amount has been added to your account!', 'Updated!');
        this.router.navigate(['./customer-list']);
      }
      else {
        this.toastMessages.error('Error While Updating!', 'Error!!');
      }
    },
      err => {
        console.log(err, "error")
      }
    )
  }
  findAmount() {
    this.input.amount = this.input.ampere * 2000;
    this.input.balance = this.input.amount - this.input.paid
  }
  findBalance() {
    this.input.balance = this.input.amount - this.input.paid
  }
  customerListData: any = [];
  cname;
  getCustomerListData() {
    this.customerListData.push(this.catchData.getData());
    try {
      this.input.name = this.customerListData[0].name;
      this.input.phone_no = this.customerListData[0].phone_no;
      this.input.panel = this.customerListData[0].panel;
      this.input.street_no = this.customerListData[0].street_no;
      this.input.paid = this.customerListData[0].paid;
      this.input.ampere = this.customerListData[0].ampere;
      this.input.amount = this.customerListData[0].amount;
      this.input.id_number = this.customerListData[0].id_number;
    }
    catch (Exeption) {
      console.log("")
    }
  }

  ngOnInit() {
    this.getCustomersData();
    this.getCustomerListData();
    
  }


}
