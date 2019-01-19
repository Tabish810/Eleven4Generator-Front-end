import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FilterPipe } from '../pipes/feeListPipe.pipe';
import {CalculationService} from '../services/calculation.service';
import {  Router} from '@angular/router';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.css']
})
export class FeeListComponent implements OnInit {
  queryString;
  queryYear;
  public input: any;
  public recordsId: any; 
  searchableList: any = [];
  searchYear: any = [];
  // @ViewChild('FilterPipe') filterAmount: FilterPipe;
  // newAmount = this.filterAmount.amount;
  // newBalance = this.filterAmount.balance;
  constructor(private http: HttpService, public toastMessages: ToastsManager
    , vcr: ViewContainerRef,public cal :CalculationService, private router : Router) {
    this.toastMessages.setRootViewContainerRef(vcr);
    this.input = {
      id_number:"",
      name: "",
      panel: "",
      phone_no: "",
      month: "",
      paid: "",
      street_no: "",
      ampere: "",
      amount: "",
      balance: "",
      month_date:""
    };
    this.printData =[ {
      name: "",
      panel: "",
      phone_no: "",
      month: "",
      paid: "",
      street_no: "",
      ampere: "",
      amount: "",
      balance: "",
      month_date:""
    }];
    
    this.searchableList = ['name', 'phone_no', 'panel' ,'street_no','month', 'year'];
    this.searchYear = ['year'];
    this.queryString = '';
    this.queryYear = '';
  }
  date = new Date();

  url = 'getAllCustomerFee';
  list;
  getFeeList() {
    return this.http.getData(this.url).subscribe(data1 => {
      this.list = data1.data;
      this.check(this.list);
    }, err => {
      console.log(err, "Oops It is an error");
    })
  }
  deleteFeeData(id, index) {
    var url = 'customerFeeDelete/' + id;
    this.http.deleteData(url).subscribe(data1 => {
      if (data1.statusCode === 200) {
        this.toastMessages.success('Data Has been Deleted!', 'Deleted!');
        this.list.splice(index, 1);
        this.router.navigate(['./customer-list']);
      }
      else {
        this.toastMessages.error('Error While Deleting!', 'Error!!');
      }

    },
      err => {
        console.log(err, "error")
      }
    )
  }
  onClick(items, index) {
    this.deleteFeeData(items._id, index);
  }
  onUpdate(items) {
    this.input.id_number = items.id_number;
    this.input.name = items.name;
    this.input.panel = items.panel;
    this.input.phone_no = items.phone_no;
    this.input.month = items.month;
    this.input.paid = items.paid;
    this.input.street_no = items.street_no;
    this.input.ampere = items.ampere;
    this.input.amount = items.amount;
    this.input.balance = items.balance;
    this.input.month_date = items.month_date;
    this.recordsId = items._id;
  }
  editPopUpRecords() {
    this.updateModalRecords(this.recordsId, this.input);
  }
  list2;
  updateModalRecords(id, items) {
    var url = 'customerFeeUpdate/' + id;
    this.http.editData(url, items).subscribe(data1 => {
      if (data1.statusCode !== 505) {
        this.toastMessages.success('Data Has been Updated!', 'Updated!');
        this.router.navigate(['./customer-list']);
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
  check(items) {
    for(let i=0;i<items.length;i++){
      if (items[i].balance!=0) {
        items[i].checked=true;
      }
    }
    
  }
  findAmount() {
    this.input.amount = this.input.ampere * 2000;
    this.input.balance = this.input.amount - this.input.paid
  }
  findBalance() {
    this.input.balance = this.input.amount - this.input.paid
  }
  paidAmount(){
    this.input.amount = this.input.ampere * 2000;
    this.input.balance = this.input.amount - this.input.paid
  }
  
  //  Total Amouont Calculated

  // public total_paid = 0;
  // totalAmount(list) {
  //   for (let i = 0; i < list.length; i++) {
  //     this.total_paid = this.total_paid + this.list[i].paid;
  //   }
  // }

  //  Total Amouont Calculated

  // public total_balance = 0;
  // totalBalance(list) {
  //   for (let i = 0; i < list.length; i++) {
  //     this.total_balance = this.total_balance + this.list[i].balance;
  //   }
  // }
//   printContent() {
//     let printContents =document.getElementById("print-data").innerHTML;
//     document.write(
//         '<body onload="window.print();">'
//         + printContents + '</body></html>');
//     document.close();
// }

  printData;
  duplicate_slip;
  printDuplicateItems(items){
    this.printData = items;
    this.duplicate_slip = "D";
    this.toastMessages.success('Duplicate slip ready to print', 'Ready!');
  }
  printOrignal(items){
    this.printData = items;
    this.duplicate_slip = "OR";
  }
  printOrignalItems(){
    this.printOrignal(this.input);
  }
  ngOnInit() {
    this.getFeeList();
  }
}
