import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['../../../../app.component.scss','./list-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListPostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
