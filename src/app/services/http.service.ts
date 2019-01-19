import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class HttpService {

  constructor(private _http : Http) { }
  base_url = "https://eleven4generator.herokuapp.com/api/";
  getData(url){
    return this._http.get(`${this.base_url}${url}`).map(data=>{
      return data.json();
    })
  }
  addData(url,data){
    return this._http.post(`${this.base_url}${url}`,data).map(data=>{
      return data.json();
    })
  }
  editData(url,data){
    return this._http.put(`${this.base_url}${url}`,data).map(data=>{
      return data.json();
    })
  }
  deleteData(url){
    return this._http.delete(`${this.base_url}${url}`).map(data=>{
      return data.json();
    })
  }

}
