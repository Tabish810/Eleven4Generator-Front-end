import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router,private authService : AuthService) { }
  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(["/"]);
    return false;
  }
  typeCheck=false;
  onLoginCheck(){
         let  user : any  = [];
          user = JSON.parse(localStorage.getItem("user"));
           for(let i=0; i < user.length;i++){
             if(user[i].type == "Admin" || user[i].type == "admin"){
               this.typeCheck = true;
             }
             else if(user[i].type == "emp"){
               this.typeCheck = false;
             }
           }    
      }
  ngOnInit() {
    this.onLoginCheck();
  }

}
