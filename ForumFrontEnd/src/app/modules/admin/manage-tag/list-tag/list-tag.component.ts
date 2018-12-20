import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin-list-tag',
  templateUrl: './list-tag.component.html',
  styleUrls: ['../../../../app.component.scss','./list-tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListTagComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
