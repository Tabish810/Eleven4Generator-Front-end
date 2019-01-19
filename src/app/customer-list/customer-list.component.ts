import { Component, OnInit, ViewContainerRef, Renderer, ElementRef } from '@angular/core';
import { HttpService } from '../services/http.service';
import { CalculationService } from '../services/calculation.service';
// import {CalculationCustomerService} from '../services/calculationCustomerList.service';
import { DataPassingService } from '../services/dataPassing.service';
import { CustomerListPipe } from '../pipes/customer-list.pipe';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { timeout } from 'q';
import { print } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  unpaidCount: Number = 0;
  paidCount: any = 0;
  feeListPaidCount : any = 0;
  public input: any;
  public inputModal: any;
  public recordsId: any;
  searchList: any = [];
  public dummy_array1: any = [];
  public dummy_array2: any = [];
  querySearch = "";

  constructor(private http: HttpService, public toastMessages: ToastsManager
    , vcr: ViewContainerRef, public calculation: CalculationService,
    private sendData: DataPassingService, private router: Router
    , private renderer: Renderer, private elemRef: ElementRef) {
    this.toastMessages.setRootViewContainerRef(vcr);
    this.inputModal = {
      id_number: "",
      name: "",
      panel: "",
      phone_no: "",
      paid: 0,
      street_no: "",
      start_month: "",
      ampere: "",
      amount: ""
    }
    // this.querySearch = '';
    this.searchList = ['id_number', 'name', 'phone_no', 'panel', 'street_no'];
  }
 countEsc : any = 0;
 escBool = true; 
  onKeydown(event) {
    
    if(this.countEsc % 2 == 0){
        this.escBool = false;
      this.countEsc ++;
    }else{
      this.escBool = true;
      this.countEsc++;
    }
      // console.log(event);
    // }
  }
  url = 'getAllEntries';
  list;
  operationListCustomerTable: any = [];
  operationListFeeTable: any = [];
  getCustomerList() {
    this.http.getData(this.url).subscribe(data1 => {
      this.list = data1.data;
      this.calculateBooked(this.list);
      this.totalAmpereCustomer(this.list);
      this.totalPaidCustomer(this.list);
      this.http.getData(this.fee_list_url).subscribe(data1 => {
        this.fee_list = data1.data;
        this.checkingComparision(this.list, this.fee_list);
      }, err => { console.log("Error while catching fee list data") })
    },
      err => {
        console.log(err, "Oops It is an error");
      })
  }

  display_none(){
    console.log("keyup");
  }
  onUpdate(items) {
    this.inputModal.id_number = items.id_number;
    this.inputModal.name = items.name;
    this.inputModal.panel = items.panel;
    this.inputModal.phone_no = items.phone_no;
    this.inputModal.paid = items.paid;
    this.inputModal.street_no = items.street_no;
    this.inputModal.start_month = items.start_month;
    this.inputModal.ampere = items.ampere;
    this.inputModal.amount = items.amount;
    this.recordsId = items._id;
  }
  emptyCount = 0;
  filledCount = 0;
  calculateBooked(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === "Empty" && data[i].panel === "Empty"
        && data[i].phone_no === "Empty" && data[i].ampere === 0
        && data[i].street_no === "Empty"
      ) {
        this.emptyCount++;
      } else {
        this.filledCount++;
      }
    }
  }


  deleteCustomerData(item, index) {
    // var url = 'customerEntryDelete/'+item._id;
    this.addToDefaulters(item);
    // this.http.deleteData(url).subscribe(data1 => {
    //  if(data1.statusCode === 200){
    //   this.toastMessages.success('Data Has been Deleted!', 'Deleted!');
    //   this.list.splice(index, 1);
    //  }
    //  else{
    //   this.toastMessages.error('Error While Deleting!', 'Error!!');
    //  }

    // },
    //   err => {
    //     console.log(err, "error")
    //   }
    // )
  }

  defaultersData;
  addToDefaulters(item) {
    var mydate = new Date();
    var mlist = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
    this.input = {
      name: item.name,
      panel: item.panel,
      phone_no: item.phone_no,
      paid: item.paid,
      street_no: item.street_no,
      start_month: mlist[mydate.getMonth()],
      ampere: item.ampere,
      amount: item.amount,
      remarks: "No Remarks Exist"

    };
    var url = 'saveDefaulterEntry';
    this.http.addData(url, this.input).subscribe(data1 => {
      if (data1.statusCode === 200) {
        this.toastMessages.success('Data has been entered in Defaulter List!', 'Saved!');
        this.router.navigate(['defaulter-list']);

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
  onClick(event,item, index) {
    event.preventDefault();
    //  this.addToDefaulters(item);
    this.deleteCustomerData(item, index);
  }
  // add to defaulters

  newdata;
  insertFee() {
    var url = 'saveDefaulterEntry';
    this.http.addData(url, this.input).subscribe(data1 => {
      if (data1.statusCode === 200) {
        this.toastMessages.success('Data Has been Saved!', 'Saved!');
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

  // Updating
  editPopUpRecords() {
    this.updateModalRecords(this.recordsId, this.inputModal);
  }
  updateModalRecords(id, items) {
    var url = 'customerEntryUpdate/' + id;
    this.http.editData(url, items).subscribe(data1 => {
      if (data1.statusCode !== 505) {
        this.toastMessages.success('Data Has been Updated!', 'Updated!');
        // this.router.navigate(['./defaulter-list'])
        location.reload();
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
  printCheck1 = false;
  printCheck2 = false;
  printCheck3 = false;
  vanishPrintButton = true;
  onPrint(items, i) {
    this.printCheck1 = false;
    this.printCheck3 = false;
    this.printCheck2 = true;
    // for(let i=0; i< items.length;i++){
    this.vanishPrintButton = false;
    // }
    this.dummy_array2.push(items);
  }
  onPrintAll() {
    this.printCheck1 = true;
    this.printCheck2 = false;
    this.printCheck3 = false;
    this.toastMessages.success('Data is ready to print!', 'Ready!');
  }
  // admin privacy
  public vbutton: any = [];
  vbuttonBool = true;
  vanishEditButton() {
    this.vbutton = JSON.parse(localStorage.getItem("user"));
    for (let i = 0; i < this.vbutton.length; i++) {
      if (this.vbutton[i].type === "emp") {
        this.vbuttonBool = false;
      }
    }
  }


  // Key Up  Functions

  findAmount() {
    this.inputModal.amount = this.inputModal.ampere * 2000;
  }
  // checking customers comparision
  fee_list_url = 'getAllCustomerFee';
  fee_list;
  mydate = new Date();
  dummy_array3: any = [];
  //  check = false;
  mlist = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"];
  checkingComparision(customerList, feeList) {
    console.log("adsasdsd");
    this.getFeeInformation(feeList);
    for (let i = 0; i < customerList.length; i++) {
      for (let j = 0; j < feeList.length; j++) {
        if (customerList[i].name.toLowerCase() == feeList[j].name.toLowerCase()
          && customerList[i].phone_no == feeList[j].phone_no
          && customerList[i].panel == feeList[j].panel
          && feeList[j].month == this.mlist[this.mydate.getMonth()]
        ) {
          customerList[i].checked = true;
          // if (customerList[i].checked) {
          //   console.log(customerList[i].checked);
          //   let object = {
          //     name: customerList[i].name,
          //     panel: customerList[i].panel,
          //     phone_no: customerList[i].phone_no,
          //     paid: customerList[i].paid,
          //     street_no: customerList[i].street_no,
          //     ampere: customerList[i].ampere,
          //     amount: customerList[i].amount
          //   };
          //   this.dummy_array3.push(object);
          // }
        }
       
      }
     
      if (!customerList[i].checked && customerList[i].name != "Empty") {
        let object = {
          id_number: customerList[i].id_number,
          name: customerList[i].name,
          panel: customerList[i].panel,
          phone_no: customerList[i].phone_no,
          paid: customerList[i].paid,
          street_no: customerList[i].street_no,
          ampere: customerList[i].ampere,
          amount: customerList[i].amount
        };
        this.dummy_array1.push(object);
        console.log(this.dummy_array1);
      }
    }
    
    for (let k = 0; k < this.dummy_array3.length; k++) {
      this.paidCount += this.dummy_array3[k].paid;
    }
    for (let j = 0; j < this.dummy_array1.length; j++) {
      this.unpaidCount += this.dummy_array1[j].paid;
    }
  }
  // it has been added because little difference of paid; 
  getFeeInformation(feeList: any): any {
    var mydate = new Date();
    console.log();
    var mlist = [ "January", "February", "March", "April", "May", "June", "July",
     "August", "September", "October", "November", "December" ];
    for(let i=0; i < feeList.length; i++){
      if(feeList[i].month == mlist[mydate.getMonth()] && feeList[i].year == mydate.getFullYear()){
        // console.log(feeList[i].month == mlist[mydate.getMonth()]);
        this.feeListPaidCount += feeList[i].paid;
      }
    }
    // console.log(this.feeListPaidCount);
  }
  passData(event,items) {
    
    this.sendData.catchData(items);
    this.toastMessages.success('Fee is ready to Enter', 'Clicked !');
    event.preventDefault();
    // this.router.navigate(['fee-entry']);
  }
  resetFields() {
    this.inputModal.name = "Empty";
    this.inputModal.panel = "Empty";
    this.inputModal.phone_no = "Empty";
    this.inputModal.paid = 0;
    this.inputModal.street_no = "Empty";
    this.inputModal.start_month = "00-00-0000";
    this.inputModal.ampere = 0;
    this.inputModal.amount = 0;
  }
  public total_cusomter_paid = 0;
  totalPaidCustomer(list) {
    this.total_cusomter_paid = 0;
    for (let i = 0; i < list.length; i++) {
      this.total_cusomter_paid = this.total_cusomter_paid + list[i].paid;
    }
  }
  public total_ampere_customer = 0;
  totalAmpereCustomer(list) {
    this.total_ampere_customer = 0;
    for (let i = 0; i < list.length; i++) {
      this.total_ampere_customer = this.total_ampere_customer + list[i].ampere;
    }
  }
 
  printObjChecked;
  searchQuery;
  operationReports() {
    this.printCheck1 = false;
    this.printCheck2 = false;
    this.printCheck3 = true;

    this.searchQuery = this.querySearch.toUpperCase();
    
    for (let i = 0; i < this.dummy_array1.length; i++) {
      if (this.dummy_array1[i].street_no == this.searchQuery) {
        
        let printObj = {
          id_number: this.dummy_array1[i].id_number,
          name: this.dummy_array1[i].name,
          panel: this.dummy_array1[i].panel,
          phone_no: this.dummy_array1[i].phone_no,
          paid: this.dummy_array1[i].paid,
          street_no: this.dummy_array1[i].street_no,
          ampere: this.dummy_array1[i].ampere,
          amount: this.dummy_array1[i].amount
        };
        this.operationListCustomerTable.push(printObj);
        console.log(printObj);
      } else {
        this.printObjChecked = true;
      }
    }
    // console.log(this.operationListCustomerTable);
    this.toastMessages.success('Data is ready to print!', 'Ready!');
    console.log(this.operationListCustomerTable);
    if (this.printObjChecked) {
      // console.log("No result fourd");
    }
  }


  ngOnInit() {
    this.getCustomerList();
    this.vanishEditButton();
    // console.log(this.dummy_array3);
  }

}
