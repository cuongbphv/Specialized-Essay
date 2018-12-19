import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['../../../../app.component.scss','./detail-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailPostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
