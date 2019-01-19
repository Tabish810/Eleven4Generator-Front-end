import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = 'app';
  mydate: Date=new Date();
  
  // version():boolean{
  //  let  mlist = ["January", "February", "March", "April", "May", "June",
  //   "July", "August", "September", "October", "November", "December"];
  //   if(mlist[this.mydate.getMonth()] != "November" && this.mydate.getDay() >= 5){
  //     return false;
  //   }
  //  return true;
  // }
  ngOnInit(): void {
   
  }
 
}
