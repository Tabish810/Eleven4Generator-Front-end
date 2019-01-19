import { Pipe, PipeTransform } from '@angular/core';
import { CalculationService } from '../services/calculation.service';
import { CalculationCustomerService } from "../services/calculationCustomerList.service";

@Pipe({
  name: 'FilterPipe', 
})
export class FilterPipe implements PipeTransform {
  constructor(private cal: CalculationService,
  private customerService : CalculationCustomerService) { }
  public amount: any;
  public balance: any;

  transform(value: any, input: string, searchableList: any) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        var isTrue = false;
        for (var k in searchableList) {
          if (el[searchableList[k]].toLowerCase().indexOf(input) > -1) {
            isTrue = true;
          }
          if (isTrue) {
            return el
          }
        }
      })
    }
    if(value) {
      this.cal.totalBalance(value);
      this.cal.totalAmount(value);
      this.cal.totalAmpere(value);
      // this.customerService.totalPaidCustomer(value);
      // this.customerService.totalAmpereCustomer(value);
    }
    return value;
  }
}