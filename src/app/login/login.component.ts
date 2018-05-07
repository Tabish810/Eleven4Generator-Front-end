import { Component, OnInit,ViewContainerRef, ViewChild } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NavigateLoginService } from '../services/navigateLogin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 input = {
  employeeName : '',
  employeePassword : ''
 };

constructor(private authService : AuthService,private router :Router
  ,public toastMessages: ToastsManager , private checkUser : NavigateLoginService
  , vcr: ViewContainerRef) {
    this.toastMessages.setRootViewContainerRef(vcr);
   }
//login 

onLoginSubmit(){
   this.authService.authenticateUser(this.input).subscribe(data=>{
     let user = [];
     let obj = {};
       if(data.success){     
         for(let i = 0;i<data.data.length;i++){
           obj = {
             id : data.data[i]._id,
            name : data.data[i].employeeName,
            type : data.data[i].type
           };
           user.push(obj);
         }
          this.authService.storeUserData(data.token , user);
          for(let i=0; i<data.data.length;i++){
            if(user[i].type == "Admin" || user[i].type == "admin"){
              this.router.navigate(["/dashboard"]);
            }
            if(user[i].type == "emp"){
              this.router.navigate(["/customer-entry"]);
            }
          }
          
     }
     else {
      this.toastMessages.error('Invalid Username or Password', 'Error!');
     }
   })
 }

 ngOnInit() {
   this.checkUser.checkLogin();
  }

}
