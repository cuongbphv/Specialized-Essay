import { Component, OnInit } from '@angular/core';

import {ArticleInteractService,
  ArticleService, ProfilesService,
  TagService, TranslateService,
  UserService} from '../../core/services';
import {User} from '../../core/models';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pagingRequest: any = {
    type: 1,
    searchKey: "",
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };
  topTags: any = [];
  myTags: any = [];
  articles: any = [];
  currentUser: User;

  isOpenCategories: boolean = false;
  isOpenTags: boolean = false;
  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private tagService: TagService,
    private articleService: ArticleService,
    private profileService: ProfilesService,
    private articleInteractService: ArticleInteractService
  ) {}

  ngOnInit() {

    // get current user
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;

        // get my tags
        this.tagService.getMyTags(this.currentUser.userId).subscribe(
          tags => {
            this.myTags = tags;
          }
        );

      }
    );

    this.tagService.getMostTagInForum().subscribe(
      data => {
        this.topTags = data
      }
    );

    this.getListArticleByType(1);

    $(document).ready(function(){

      $('#btnCategories').click(function() {
        if ($("[data-dropdown-list='categories']").hasClass('dropdown--open')) {
          $("[data-dropdown-list='categories']").slideUp( "slow" ).removeClass('dropdown--open');
        }
        else {
          $("[data-dropdown-list='categories']").slideDown( "slow" ).addClass('dropdown--open');
        }
      });

      $('#btnTags').click(function() {
        if ($("[data-dropdown-list='tags']").hasClass('dropdown--open')) {
          $("[data-dropdown-list='tags']").slideUp( "slow" ).removeClass('dropdown--open');
        }
        else {
          $("[data-dropdown-list='tags']").slideDown( "slow" ).addClass('dropdown--open');
        }
      });

      $("[data-dropdown-list='categories']").mouseleave(function() {
        $("[data-dropdown-list='categories']").slideUp( "slow" ).removeClass('dropdown--open');
      });

      $("[data-dropdown-list='tags']").mouseleave(function() {
        $("[data-dropdown-list='tags']").slideUp( "slow" ).removeClass('dropdown--open');
      });

      $('#post-type li').click(function(){
        $(this).parent().children('li').not(this).removeClass('active', 1000);
        $(this).addClass('active', 1000);
      });

    });
  }

  getListArticleByType(type: number){
    this.pagingRequest.type = type;

    this.articleService.getListArticle(this.pagingRequest).subscribe(
      data => {
        this.articles = data.content;

        for(let i = 0; i < this.articles.length; i++) {
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

  openCategories() {
    this.isOpenCategories = !this.isOpenCategories;
  }

  openTags() {
    this.isOpenTags = !this.isOpenTags;
  }

}
