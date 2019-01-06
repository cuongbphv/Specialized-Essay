import {Component, OnInit} from '@angular/core';

import {AuthBaseService, UserService, SearchService, ProfilesService, TagService} from '../../core/services';
import { ToastrService } from 'ngx-toastr';
import {User} from '../../core/models';
import {NavigationExtras, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  pagingRequest: any = {
    type: 5, // type for search only tag name
    searchKey: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 5
  };

  articleResults = [];
  questionResults = [];
  tagResults = [];

  constructor(
    public authBaseService: AuthBaseService,
    private toastr: ToastrService,
    public userService: UserService,
    private seacrhService: SearchService,
    private profileService: ProfilesService,
    private tagService: TagService,
    public router: Router
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

    var $result = $('.sb__suggestions');

    $(document).mouseup(function (e) {
      if (!$result.is(e.target) // if the target of the click isn't the container...
        && $result.has(e.target).length === 0) // ... nor a descendant of the container
      {
        $result.hide();
      }
    });

  }

  setLang(lang) {
    if(lang === 'en') {
      this.toastr.success('', "Change language to English successfully!");
    }
    else if (lang === 'vi') {
      this.toastr.success('', "Thay đổi ngôn ngữ sang Tiếng Việt thành công!");
    }
  }

  searchByKeyword() {
    this.seacrhService.searchTop(this.pagingRequest).subscribe(
      data => {

        console.log(data);

        this.articleResults = data.articleResults;
        this.questionResults = data.questionResults;
        this.tagResults = data.tagResults;

        if(this.pagingRequest.searchKey === '') {
          this.tagResults = [];
        }

        // pre-process for content
        for(let i = 0; i < this.articleResults.length; i++) {
          this.profileService.get(this.articleResults[i].userId).subscribe(
            author => {
              this.articleResults[i].firstName = author.firstName;
              this.articleResults[i].lastName = author.lastName;
              this.articleResults[i].userProfileId = author.userProfileId;
              this.articleResults[i].avatar = author.avatar;
            }
          );
          let index = this.articleResults[i].content.indexOf(this.pagingRequest.searchKey);
          if(index != -1) {
            this.articleResults[i].start = index;
          }
          else {
            this.articleResults[i].start = 0;
          }
        }

        for(let i = 0; i < this.questionResults.length; i++) {
          this.profileService.get(this.questionResults[i].userId).subscribe(
            author => {
              this.questionResults[i].firstName = author.firstName;
              this.questionResults[i].lastName = author.lastName;
              this.questionResults[i].userProfileId = author.userProfileId;
              this.questionResults[i].avatar = author.avatar;
            }
          );
          let index = this.questionResults[i].content.indexOf(this.pagingRequest.searchKey);
          if(index != -1) {
            this.questionResults[i].start = index;
          }
          else {
            this.questionResults[i].start = 0;
          }
        }

        for(let i = 0; i < this.tagResults.length; i++) {
          this.tagService.getTagInfomation(this.tagResults[i].tagId).subscribe(
            info => {

              this.tagResults[i].articleNum = info[4];
              this.tagResults[i].questionNum = info[5];

              let request = {
                type: 1,
                searchKey: this.tagResults[i].tagId,
                sortCase: 1,
                ascSort: true,
                pageNumber: 1,
                pageSize: 10
              };

              this.tagService.getListFollowers(request).subscribe(
                data => {
                    this.tagResults[i].followerNum = data.totalElements;
                }
              );
            }
          );
        }

        if(this.articleResults.length > 0 || this.questionResults.length > 0 || this.tagResults.length > 0) {
          $('.sb__suggestions').show();
        }
      }
    )
  }

  searchWithKeyword() {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        keyword: encodeURIComponent(this.pagingRequest.searchKey)
      }
    };

    this.router.navigate(["search"], navigationExtras);
  }
}
