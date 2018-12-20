import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['../../../../app.component.scss','./detail-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
