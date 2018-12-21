import {Component, OnInit} from '@angular/core';

import {
  ArticleService, ProfilesService,
  TagService, TranslateService,
  UserService
} from '../../core/services';
import {User} from '../../core/models';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pagingRequest: any = {
    type: 1,
    searchKey: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };
  pagingRequestBookmark: any = {
    type: 1,
    searchKey: '',
    sortCase: 1,
    ascSort: false,
    pageNumber: 1,
    pageSize: 10
  };
  pagingRequestTrending: any = {
    type: 1,
    searchKey: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };
  topTags: any = [];
  myTags: any = [];
  articles: any = [];
  currentUser: User;
  collectionSize: number;
  navType: number;
  bookmarks: any = [];
  trendings: any = [];

  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private tagService: TagService,
    private articleService: ArticleService,
    private profileService: ProfilesService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {

    $(document).ready(function () {

      $('#btnMenu').click(function () {
        if ($('[data-dropdown-list=\'menu\']').hasClass('dropdown--open')) {
          $('[data-dropdown-list=\'menu\']').slideUp('slow').removeClass('dropdown--open');
        } else {
          $('[data-dropdown-list=\'menu\']').slideDown('slow').addClass('dropdown--open');
        }
      });

      $('#btnTags').click(function () {
        if ($('[data-dropdown-list=\'tags\']').hasClass('dropdown--open')) {
          $('[data-dropdown-list=\'tags\']').slideUp('slow').removeClass('dropdown--open');
        } else {
          $('[data-dropdown-list=\'tags\']').slideDown('slow').addClass('dropdown--open');
        }
      });

      $('[data-dropdown-list=\'menu\']').mouseleave(function () {
        $('[data-dropdown-list=\'menu\']').slideUp('slow').removeClass('dropdown--open');
      });

      $('[data-dropdown-list=\'tags\']').mouseleave(function () {
        $('[data-dropdown-list=\'tags\']').slideUp('slow').removeClass('dropdown--open');
      });

      $('#post-type li').click(function () {
        $(this).parent().children('li').not(this).removeClass('active', 1000);
        $(this).addClass('active', 1000);
      });

    });

    this.spinner.show();

    // get current user
    this.userService.currentUser.subscribe(
      (userData) => {
        if (Object.keys(userData).length !== 0) {
          this.currentUser = userData;

          // get my tags
          this.tagService.getMyTags(this.currentUser.userId).subscribe(
            tags => {
              this.myTags = tags;
            }
          );
        }
      }
    );

    this.tagService.getMostTagInForum().subscribe(
      data => {
        this.topTags = data;
      }
    );

    this.getListArticleByType(1, 1);

    this.spinner.hide();

  }

  getListArticleByType(type: number, navType: number) {

    this.navType = navType;
    this.pagingRequest.type = type;

    this.articleService.getListArticle(this.pagingRequest).subscribe(
      data => {

        this.articles = data.content;

        this.collectionSize = data.totalElements;

        for (let i = 0; i < this.articles.length; i++) {

          if(this.articles[i].rightAnswerId == undefined) {
            this.articles[i].rightAnswerId = '';
          }

          this.articleService.getDetailPost(this.articles[i].articleId).subscribe(
            data => {

              // Author
              this.profileService.get(this.articles[i].userId).subscribe(
                author => {
                  this.articles[i].firstName = author.firstName;
                  this.articles[i].lastName = author.lastName;
                  this.articles[i].userProfileId = author.userProfileId;
                }
              );

              // Stats
              this.articleService.statByArticle(this.articles[i].articleId).subscribe(
                data => {
                  this.articles[i].rating = data.rating;
                  this.articles[i].bookmarkCount = data.bookmark;
                  this.articles[i].share = data.share;
                  this.articles[i].commentNum = data.commentNum;
                  this.articles[i].tags = data.tags;
                }
              );

            }
          );
        }

        console.log(this.articles);

      }
    );

  }

  getListBookmarkArticle(type: number, navType: number, sortCase: number, ascSort: boolean) {

    this.navType = navType;

    // set type
    this.pagingRequestBookmark.type = type;
    this.pagingRequestBookmark.searchKey = this.currentUser.userId;
    this.pagingRequestBookmark.sortCase = sortCase;
    this.pagingRequestBookmark.ascSort = ascSort;

    this.articleService.getBookmarkList(this.pagingRequestBookmark).subscribe(
      bookmarks => {

        this.bookmarks = bookmarks.data;

        this.collectionSize = bookmarks.data.totalElements;

        for (let i = 0; i < this.bookmarks.length; i++) {
          // Author
          this.profileService.get(this.bookmarks[i].article.userId).subscribe(
            author => {
              this.bookmarks[i].article.firstName = author.firstName;
              this.bookmarks[i].article.lastName = author.lastName;
              this.bookmarks[i].article.userProfileId = author.userProfileId;
            }
          );

          // Stats
          this.articleService.statByArticle(this.bookmarks[i].article.articleId).subscribe(
            data => {
              this.bookmarks[i].article.rating = data.rating;
              this.bookmarks[i].article.bookmarkCount = data.bookmark;
              this.bookmarks[i].article.share = data.share;
              this.bookmarks[i].article.commentNum = data.commentNum;
              this.bookmarks[i].article.tags = data.tags;
            }
          );
        }
      }
    );

  }

  getListTrendingArticleByType(type: number, navType: number, searchType: string) {

    this.navType = navType;
    this.pagingRequestTrending.type = type;
    this.pagingRequestTrending.searchKey = searchType;

    this.articleService.getTrendingList(this.pagingRequestTrending).subscribe(
      data => {
        this.trendings = data.content;

        this.collectionSize = data.totalElements;

        for (let i = 0; i < this.trendings.length; i++) {

          if(this.trendings[i].rightAnswerId == undefined) {
            this.trendings[i].rightAnswerId = '';
          }

          this.articleService.getDetailPost(this.trendings[i].articleId).subscribe(
            data => {

              // Author
              this.profileService.get(this.trendings[i].userId).subscribe(
                author => {
                  this.trendings[i].firstName = author.firstName;
                  this.trendings[i].lastName = author.lastName;
                  this.trendings[i].userProfileId = author.userProfileId;
                }
              );

              // Stats
              this.articleService.statByArticle(this.trendings[i].articleId).subscribe(
                data => {
                  this.trendings[i].rating = data.rating;
                  this.trendings[i].bookmarkCount = data.bookmark;
                  this.trendings[i].share = data.share;
                  this.trendings[i].commentNum = data.commentNum;
                  this.trendings[i].tags = data.tags;
                }
              );

              this.spinner.hide();

            }
          );
        }

      }
    );

  }

}
