import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <h1>Eleven4 Generator Says!!</h1>
    <h2>
      Oops! Page Not Found
    </h2> 
  `,
  styles: [`
    h1{
      margin:10% auto 0 30%;
    }
    h2{
      margin:5% auto 0 30%;
      color:red;
    }
  `]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
