import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchRecieved',
})

export class SearchRecievedPipe implements PipeTransform {

  transform(items: any, search: any): any {
    if(search === undefined) return items;
    return items.filter(function(items){
      return items.month.toLowerCase().includes(search.toLowerCase());
    })
  }

}
