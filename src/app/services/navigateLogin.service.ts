import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/catch';
import { e } from '@angular/core/src/render3';
@Injectable()
export class NavigateLoginService {

  constructor(private router : Router, private authGuard : AuthService) { }
    array : any = [];
    userArray : any = [];
  checkLogin(){
   this.array = JSON.parse(localStorage.getItem("user"));
   try{
    for(let i=0; i< this.array.length; i++){
      if(this.array[i].type === 'emp' || this.array[i].type === 'admin'
       || this.array[i].type === 'Admin'){
          this.router.navigate(['./fee-list']);
      }
  }

}
  catch(Exception){
  }

   
  }
  checkUser(){
    this.userArray = JSON.parse(localStorage.getItem("user"));
     for(let i=0; i< this.userArray.length; i++){
         if( this.userArray[i].type === 'emp'){
             this.router.navigate(['./fee-list']);
         }
     }
   }
  
  }


