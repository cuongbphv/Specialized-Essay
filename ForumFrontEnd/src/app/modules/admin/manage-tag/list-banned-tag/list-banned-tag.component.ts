import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {TagService, UserService} from '../../../../core/services';
import {User} from '../../../../core/models';

@Component({
  selector: 'admin-list-banned-tag',
  templateUrl: './list-banned-tag.component.html',
  styleUrls: ['../../../../app.component.scss','./list-banned-tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListBannedTagComponent implements OnInit {

  constructor(
    private tagService: TagService,
    private userService: UserService
  ) { }

  pagingRequest: any = {
    searchKey: "",
    sortCase: 1,
    ascSort: false,
    pageNumber: 1,
    pageSize: 10
  };

  tags: any = [];
  collectionSize: number;

  currentUser: User;

  ngOnInit() {

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

    this.getListTag();

  }

  getListTag(){

    this.tagService.getListBannedTagPaging(this.pagingRequest).subscribe(data => {
        this.tags = data.content;
      this.collectionSize = data.totalElements;
    });

  }


}
