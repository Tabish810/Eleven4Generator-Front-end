import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataPassingService{

  constructor(private http : Http) { }
  customerListData : any;
  catchData(dataSet){
    this.customerListData = dataSet;
  }
  getData(){
    return this.customerListData;
  }
 
}
