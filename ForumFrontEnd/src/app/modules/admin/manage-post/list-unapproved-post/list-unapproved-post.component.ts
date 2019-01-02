import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {ArticleService, ProfilesService, UserService} from '../../../../core/services';
import {User} from '../../../../core/models';


@Component({
  selector: 'admin-list-unapproved-post',
  templateUrl: './list-unapproved-post.component.html',
  styleUrls: ['../../../../app.component.scss','./list-unapproved-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListUnapprovedPostComponent implements OnInit {

  pagingRequest: any = {
    searchKey: "",
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };

  articles: any = [];
  collectionSize: number;


  currentUser: User;

  constructor(
    private profileService: ProfilesService,
    private articleService: ArticleService,
    private userService: UserService) {

  }

  ngOnInit() {

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

    this.getListPost();
  }


  getListPost(){

    this.articleService.getListUnapprovedArticle(this.pagingRequest).subscribe(
      data => {
        this.articles = data.content;
        this.collectionSize = data.totalElements;

        for(let i = 0; i < this.articles.length; i++) {
          this.articleService.getDetailPost(this.articles[i].articleId).subscribe(
            data => {

              // Author
              this.profileService.get(this.articles[i].userId).subscribe(
                author => {
                  this.articles[i].firstName = author.firstName;
                  this.articles[i].lastName = author.lastName;
                  this.articles[i].userProfileId = author.userProfileId;
                  this.articles[i].userId = author.userId;
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
      }
    );

  }

}
