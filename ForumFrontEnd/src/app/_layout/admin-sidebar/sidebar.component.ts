import { Component, OnInit } from '@angular/core';
import {User} from '../../core/models';
import {UserService} from '../../core/services';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  constructor(
    private userService:UserService
  ) { }

  currentUser: User;

  ngOnInit() {

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

  }

}
