import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../../core/models';
import {UserService} from '../../../../core/services';

@Component({
  selector: 'admin-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['../../../../app.component.scss','./list-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListUserComponent implements OnInit {

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
    this.userService.getListUser(this.pagingRequest)
      .subscribe(data => {
        this.users = data.content;
        this.collectionSize = data.totalElements;
      })
  }

}
