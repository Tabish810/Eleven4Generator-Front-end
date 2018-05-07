import { Component, OnInit,ViewContainerRef,Renderer,ElementRef} from '@angular/core';
import {HttpService} from '../services/http.service';
import {CalculationService} from '../services/calculation.service';
import {CalculationCustomerService} from '../services/calculationCustomerList.service';
import {DataPassingService} from '../services/dataPassing.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { timeout } from 'q';
import {CustomerListPipe} from '../pipes/cutomerListPipe.pipe';
import { print } from 'util';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public input : any;
  public inputModal : any;
  public recordsId : any;
  searchableList : any = [];
  public dummy_array1 : any = [];
  public dummy_array2 : any = [];
  queryString;

  constructor(private http : HttpService,public toastMessages: ToastsManager
    , vcr: ViewContainerRef,public calculation : CalculationCustomerService,
   private sendData : DataPassingService, private router:Router
  ,private renderer : Renderer, private elemRef : ElementRef) {
      this.toastMessages.setRootViewContainerRef(vcr);
      this.inputModal={
        id_number : "",
        name : "",
        panel:"",
        phone_no : "",
        paid : "",
        street_no:"",
        start_month : "",
        ampere :"",
        amount:""
      }
      this.queryString='';
      this.searchableList = ['name','panel','phone_no','street_no','start_month'] ;
     }
    
  url = 'getAllEntries';
  list;
  getCustomerList(){
     this.http.getData(this.url).subscribe(data1=>{
      this.list = data1.data;
     this.http.getData(this.fee_list_url).subscribe(data1=>{
        this.fee_list = data1.data;
        this.checkingComparision(this.list,this.fee_list);
      },err=>{console.log("Error while catching fee list data")})
    },
    err=>{
      console.log(err,"Oops It is an error");
    })
  }

  onUpdate(items){
    this.inputModal.id_number = items.id_number;
    this.inputModal.name = items.name;
    this.inputModal.panel = items.panel;
    this.inputModal.phone_no = items.phone_no;
    this.inputModal.paid = items.paid;
    this.inputModal.street_no = items.street_no;
    this.inputModal.start_month = items.start_month;
    this.inputModal.ampere = items.ampere;
    this.inputModal.amount = items.amount;
    this.recordsId  = items._id;
  }


  deleteCustomerData(item,index){
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
addToDefaulters(item){
 this.input={
    name : item.name,
    panel:item.panel,
    phone_no:item.phone_no,
    paid:item.paid,
    street_no:item.street_no,
    start_month:item.start_month,
    ampere:item.ampere,
    amount:item.amount,
    remarks : "No Remarks Exist"
 
  };
      var url = 'saveDefaulterEntry';
      this.http.addData(url,this.input).subscribe(data1 => {
        if(data1.statusCode === 200){
          this.toastMessages.success('Data has been entered in Defaulter List!', 'Saved!');
          
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
onClick(item, index){
//  this.addToDefaulters(item);
  this.deleteCustomerData(item, index);
}
      // add to defaulters

      newdata;
      insertFee(){
          var url = 'saveDefaulterEntry';
          this.http.addData(url,this.input).subscribe(data1 => {
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
    
        // Updating
        editPopUpRecords(){
          this.updateModalRecords(this.recordsId , this.inputModal);
        }
        updateModalRecords(id,items){
          var url = 'customerEntryUpdate/'+id;
          this.http.editData(url,items).subscribe(data1 => { 
            if(data1.statusCode !== 505){
              this.toastMessages.success('Data Has been Updated!', 'Updated!');
              // location.reload();
              this.router.navigate(['./defaulter-list'])
            }
            else{
              this.toastMessages.error('Error While Updating!', 'Error!!');
              console.log(data1, "Data not save")
            }
         },
          err => {
            console.log(err, "error")
          }
        )
      }
      printCheck1=false;
      printCheck2=false;
      vanishPrintButton=true;
      onPrint(items,i){
        this.printCheck1 = false;
        this.printCheck2 = true;
        // for(let i=0; i< items.length;i++){
          this.vanishPrintButton=false;
        // }
        this.dummy_array2.push(items);
      }
      onPrintAll(){
        this.printCheck1 = true;
        this.printCheck2 = false;
      }
      // Key Up  Functions
    
findAmount(){
    this.inputModal.amount = this.inputModal.ampere * 2000;
  }
  
  //  Total Ampere
  // public total_ampere = 0;
  // totalAmpere(list){
  //     for(let i=0; i < list.length; i++){
  //       this.total_ampere = this.total_ampere + this.list[i].ampere;
  //     }
  // }
  // Total Customers Payment
  // public total_paid = 0;
//   totalPaid(list){
//     for(let i=0; i < list.length; i++){
//       this.total_paid = this.total_paid + this.list[i].paid;
//     }
// }
  // checking customers comparision
  fee_list_url = 'getAllCustomerFee';
  fee_list;
  checkingColor(index){
    
  }
   mydate = new Date();
  //  check = false;
   mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  checkingComparision(customerList,feeList){
    for(let i =0; i < customerList.length;i++){
      for(let j=0; j < feeList.length;j++){
        if(customerList[i].name == feeList[j].name
        && customerList[i].phone_no == feeList[j].phone_no
        && customerList[i].panel == feeList[j].panel
        && feeList[j].month == this.mlist[this.mydate.getMonth()]
      ){
        customerList[i].checked = true;
        }
      }
      if(!customerList[i].checked) {
        let object = {
          name : customerList[i].name,
          panel :customerList[i].panel,
          phone_no : customerList[i].phone_no,
          paid : customerList[i].paid,
          street_no : customerList[i].street_no,
          ampere : customerList[i].ampere,
          amount : customerList[i].amount
        };
        this.dummy_array1.push(object);
      }
    }
  }
  passData(items){
    this.sendData.catchData(items);
    }
  ngOnInit() {
    this.getCustomerList();
  }

}
