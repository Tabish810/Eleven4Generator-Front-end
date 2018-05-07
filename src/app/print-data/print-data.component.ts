import { Component, OnInit, ViewChild } from '@angular/core';
import { FeeListComponent } from '../fee-list/fee-list.component';

@Component({
  selector: 'app-print-data',
  templateUrl: './print-data.component.html',
  styleUrls: ['./print-data.component.css']
})
export class PrintDataComponent implements OnInit {

  @ViewChild('FeeListComponent') print : FeeListComponent;
  constructor() {
    
   }

  ngOnInit() {
  }

}
