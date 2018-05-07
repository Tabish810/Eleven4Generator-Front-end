import { Pipe, PipeTransform } from '@angular/core';
import { CalculationService } from '../services/calculation.service';


@Pipe({
  name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
  constructor(private cal: CalculationService) { }
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
    }
    return value;
  }
}