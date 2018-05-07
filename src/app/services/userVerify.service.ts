import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  verifyUser(data) {
    let userVerify = {
      id: data.id,
      name: data.name,
      type: data.type
    }
    return userVerify;
  }


}
