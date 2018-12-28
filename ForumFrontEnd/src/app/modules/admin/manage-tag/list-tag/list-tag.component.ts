import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {TagService} from '../../../../core/services';
import {User} from '../../../../core/models';

@Component({
  selector: 'admin-list-tag',
  templateUrl: './list-tag.component.html',
  styleUrls: ['../../../../app.component.scss','./list-tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListTagComponent implements OnInit {

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

    this.tagService.getListTagPaging(this.pagingRequest).subscribe(data => {
        this.tags = data.content;
      this.collectionSize = data.totalElements;
    });

  }


}
