import { Injectable } from '@angular/core';
@Injectable()
export class CalculationCustomerService {
    constructor() { }
  //    Customer Entry Calculations

   //  Total Paid Calculated

   public total_cusomter_paid = 0;
   totalPaidCustomer(list) {
     this.total_cusomter_paid = 0;
     for (let i = 0; i < list.length; i++) {
       this.total_cusomter_paid = this.total_cusomter_paid + list[i].paid;
     }
   }
 
   //  Total Amount Calculated
 
//    public total_amount_customer = 0;
//    totalAmountCustomer(list) {
//      this.total_amount_customer = 0;
//      for (let i = 0; i < list.length; i++) {
//        this.total_amount_customer = this.total_amount_customer + list[i].amount;
//      } 
//    }
 
   public total_ampere_customer = 0;
   totalAmpereCustomer(list) {
     this.total_ampere_customer = 0;
     for (let i = 0; i < list.length; i++) {
       this.total_ampere_customer = this.total_ampere_customer + list[i].ampere;
     }
   }

}