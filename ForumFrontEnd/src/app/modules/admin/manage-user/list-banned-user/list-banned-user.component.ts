import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../../core/models';
import {UserService} from '../../../../core/services';

@Component({
  selector: 'admin-list-banned-user',
  templateUrl: './list-banned-user.component.html',
  styleUrls: ['../../../../app.component.scss','./list-banned-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListBannedUserComponent implements OnInit {

  pagingRequest: any = {
    searchKey: "",
    sortCase: 1,
    ascSort: false,
    pageNumber: 1,
    pageSize: 10
  };

  users: Array<User> = [];
  collectionSize: number;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    this.getListUser();

  }

  getListUser(){
    this.userService.getListBannedUser(this.pagingRequest)
      .subscribe(data => {
        this.users = data.content;
        this.collectionSize = data.totalElements;
      })
  }

}
