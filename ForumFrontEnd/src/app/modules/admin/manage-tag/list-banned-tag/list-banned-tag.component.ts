import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {TagService} from '../../../../core/services';

@Component({
  selector: 'admin-list-banned-tag',
  templateUrl: './list-banned-tag.component.html',
  styleUrls: ['../../../../app.component.scss','./list-banned-tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListBannedTagComponent implements OnInit {

  constructor(
    private tagService: TagService
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

  ngOnInit() {

    this.getListTag();

  }

  getListTag(){

    this.tagService.getListBannedTagPaging(this.pagingRequest).subscribe(data => {
        this.tags = data.content;
      this.collectionSize = data.totalElements;
    });

  }


}
