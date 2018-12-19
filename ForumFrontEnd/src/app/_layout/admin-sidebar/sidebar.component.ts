import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

}
