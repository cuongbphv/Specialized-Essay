import { Component, OnInit } from '@angular/core';

import {ArticleService, TagService, TranslateService, UserService} from '../../core/services';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pagingRequest: any = {
    searchKey: "",
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };
  topTags: any = [];
  listArticle: any = [];

  isOpenCategories: boolean = false;
  isOpenTags: boolean = false;
  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private tagService: TagService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {

    this.tagService.getMostTagInForum().subscribe(
      data => {
        this.topTags = data
      }
    );

    this.articleService.getListArticle(this.pagingRequest).subscribe(
      data => {
        this.listArticle = data.content;
        console.log((this.listArticle));
      }
    );

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

  openCategories() {
    this.isOpenCategories = !this.isOpenCategories;
  }

  openTags() {
    this.isOpenTags = !this.isOpenTags;
  }

}
