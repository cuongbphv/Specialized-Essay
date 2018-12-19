import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['../../../../app.component.scss','./list-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
