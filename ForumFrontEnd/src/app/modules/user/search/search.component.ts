import {Component, OnInit} from '@angular/core';

import {
  ArticleService, ProfilesService, SearchService,
  TagService, TranslateService,
  UserService
} from '../../../core/services';
import {User} from '../../../core/models';
import { NgxSpinnerService } from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  currentUser: User;
  collectionSize: number;
  keyword: string;
  pagingRequest: any = {
    type: 1,
    searchKey: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };
  articles = [];

  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfilesService,
    private searchService: SearchService
  ) {
    this.route.queryParams.subscribe(params => {
      this.keyword = decodeURIComponent(params["keyword"]);
    });
  }

  ngOnInit() {

    // get current user
    this.userService.currentUser.subscribe(
      (userData) => {
        if (Object.keys(userData).length !== 0) {
          this.currentUser = userData;
        }
      }
    );

    // search
    this.searchByType(1, 2 ,false); // search by view count
  }

  searchByType(type: number, sortCase: number, ascSort: boolean) {
    this.pagingRequest.searchKey = this.keyword;
    this.pagingRequest.type = type;
    this.pagingRequest.sortCase = sortCase;
    this.pagingRequest.ascSort = ascSort;
    this.searchService.searchByType(this.pagingRequest).subscribe(
      data => {
        this.articles = data.data;
        this.collectionSize = data.totalElements;

        for(let i = 0; i < this.articles.length; i++) {

          this.profileService.get(this.articles[i].userId).subscribe(
            author => {
              this.articles[i].firstName = author.firstName;
              this.articles[i].lastName = author.lastName;
              this.articles[i].userProfileId = author.userProfileId;
              this.articles[i].avatar = author.avatar;
            }
          );

          // pre-process for content
          let index = this.articles[i].content.indexOf(this.pagingRequest.searchKey);
          if(index != -1) {
            this.articles[i].start = index;
          }
          else {
            this.articles[i].start = 0;
          }

        }
      }
    );
  }

}
