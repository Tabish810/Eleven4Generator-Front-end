import { Injectable } from '@angular/core';
@Injectable()
export class CalculationService {
    constructor() { }

    //  Total Amouont Calculated

  public total_paid = 0;
  totalAmount(list) {
    this.total_paid = 0;
    for (let i = 0; i < list.length; i++) {
      this.total_paid = this.total_paid + list[i].paid;
    }
  }

  //  Total Amouont Calculated

  public total_balance = 0;
  totalBalance(list) {
    this.total_balance = 0;
    for (let i = 0; i < list.length; i++) {
      this.total_balance = this.total_balance + list[i].balance;
    }
  }

  public total_ampere = 0;
  totalAmpere(list) {
    this.total_ampere = 0;
    for (let i = 0; i < list.length; i++) {
      this.total_ampere = this.total_ampere + list[i].ampere;
    }
  }
    
}