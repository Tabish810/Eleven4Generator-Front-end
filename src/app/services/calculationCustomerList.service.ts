import { Injectable } from '@angular/core';
@Injectable()
export class CalculationCustomerService {
    constructor() { }

   public total_cusomter_paid = 0;
   totalPaidCustomer(list) {
     console.log(list);
     this.total_cusomter_paid = 0;
     for (let i = 0; i < list.length; i++) {
       this.total_cusomter_paid = this.total_cusomter_paid + list[i].paid;
     }
     console.log(this.total_cusomter_paid);
   }
   public total_ampere_customer = 0;
   totalAmpereCustomer(list) {
    console.log(list);
     this.total_ampere_customer = 0;
     for (let i = 0; i < list.length; i++) {
       this.total_ampere_customer = this.total_ampere_customer + list[i].ampere;
      }
      console.log(this.total_ampere_customer);
   }

}