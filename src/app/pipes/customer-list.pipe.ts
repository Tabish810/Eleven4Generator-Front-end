import { Pipe, PipeTransform } from '@angular/core';
import { CalculationCustomerService } from '../services/calculationCustomerList.service';

@Pipe({
  name: 'customerList'
})
export class CustomerListPipe implements PipeTransform {
  constructor(private customerService : CalculationCustomerService){}
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
    // if(value) {
    //   console.log(value);
    //   this.customerService.totalPaidCustomer(value);
    //   this.customerService.totalAmpereCustomer(value);
    // }
    return value;
  }
}
