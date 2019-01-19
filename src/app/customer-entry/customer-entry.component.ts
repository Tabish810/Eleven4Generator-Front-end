import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DataPassingService } from '../services/dataPassing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-entry',
  templateUrl: './customer-entry.component.html',
  styleUrls: ['./customer-entry.component.css']
})
export class CustomerEntryComponent implements OnInit {

  public input: any;
  constructor(private http: HttpService, public toastMessages: ToastsManager,
    private catchData: DataPassingService, private router : Router
    , vcr: ViewContainerRef) {
    this.toastMessages.setRootViewContainerRef(vcr);
    this.input = {
      id_number: "",
      name: "",
      panel: "PANEL-",
      phone_no: "",
      paid: "",
      street_no: "STREET-",
      start_month: "",
      ampere: "",
      amount: ""
    };
  }

  newdata;
//  public idList : any = [];
//  public idListNumber : any = {};
  listCheck=true;
  insertCustomer() {
    var url = 'saveCustomerEntry';
    // this.idListNumber = {
    //   id_number : this.input.id_number
    // };
    // this.idList.push(this.idListNumber);
    // console.log(this.idListNumber);
    if(this.list.length !== 0){
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id_number == this.input.id_number) {
          // console.log(this.input.id_number);
          this.toastMessages.error('Duplicate key present', 'ERROR!', 1000);
          this.listCheck = false;
          break;
        }else{
          
          this.http.addData(url, this.input).subscribe(data1 => {
            if (data1.statusCode === 200) {
              this.toastMessages.success('Data Has been Saved!', 'Saved!', 1000);
              // this.router.navigate(['./customer-list']);
              location.reload();
            }
            else {
              this.toastMessages.error('Something went wrong!', 'Error!!', { timeout: 2000 });
            }
          },
          err => {
            console.log(err, "error");
          }
        )   
        break; 
        }
      }
    }
    else if (this.list.length === 0){
      this.http.addData(url, this.input).subscribe(data1 => {
        if (data1.statusCode === 200) {
          this.toastMessages.success('Data Has been Saved!', 'Saved!', 1000);
          this.router.navigate(['./customer-list']);
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
  }
  findAmount() {
    this.input.amount = this.input.ampere * 2000;
  }
  url = 'getAllEntries';
  list;
  getCustomerList() {
    this.http.getData(this.url).subscribe(data1 => {
      this.list = data1.data;
      this.input.id_number = "ID-"+(this.list.length+1);
    },
      err => {
        console.log(err, "Oops It is an error");
      })
  }
  ngOnInit() {
    this.getCustomerList();
  }
}
