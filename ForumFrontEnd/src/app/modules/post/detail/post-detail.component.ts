import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {
  ArticleInteractService,
  ArticleService, CommentService,
  CustomToastrService, ModalService, ProfilesService, ReportArticleService, TranslateService,
  UserService
} from '../../../core/services';
import {ActivatedRoute} from '@angular/router';
import marked from 'marked';
import {User,Comment} from '../../../core/models';

import * as $ from 'jquery';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  lang: string = "";
  rating: number = 0;
  bookmarkCount: number = 0;
  commentCount: number = 0;
  article: any = {};
  author: any = {};
  headingTag: any = [];
  listInteracts = [];
  myInteract: any = {
    articleId: '',
    userId: '',
    rating: 0,
    bookmark: 0,
    share: 0
  };
  myReport: any = {
    articleId: '',
    userId: '',
    reason: ''
  };
  currentUser: User;
  newComment: Comment;
  listComments = [];
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(
    public articleService: ArticleService,
    private articleInteractService: ArticleInteractService,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastrService: CustomToastrService,
    private modalService: ModalService,
    private reportArticleService: ReportArticleService,
    private profileService: ProfilesService,
    public translateService: TranslateService,
    private commentService: CommentService,
    private _location: Location
  ) {
  }

  ngOnInit(): void {

    // init commnet
    this.newComment = new class implements Comment {
      articleId: string;
      commentId: string;
      content: string;
      createDate: Date;
      parentId: string;
      userId: string;
    };

    // get current language
    this.translateService.lang.subscribe(
      lang => {
        this.lang = lang;
      }
    );

    // get current user
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

    this.route.params.subscribe(params => {
      this.articleService.getDetailPost(params['id']).subscribe(
        data => {

          // Content data
          data.content = this.preRenderMarkdown(data.content);
          this.article = data;

          // Author
          this.getAuthorInfo(this.article.userId);

          // Interact
          this.myInteract.articleId = this.article.articleId;
          this.myInteract.userId = this.currentUser.userId;
          this.getListInteract();

          // Comment
          this.getCommentsInArticle(this.article.articleId,this.pageNumber,this.pageSize);

          // work with view count
          this.countViewOfArticle();
        }
      );
    });
  }

  preRenderMarkdown(content: string) {
    let htmlTag = marked(content, {sanitize: true, tables: true}).split('\n');
    for (let i = 0; i < htmlTag.length; i++) {
      if (htmlTag[i].includes('</h1>') || htmlTag[i].includes('</h2>')
        || htmlTag[i].includes('</h3>') || htmlTag[i].includes('</h4>')
        || htmlTag[i].includes('</h5>') || htmlTag[i].includes('</h6>')) {
        this.headingTag.push({
          id: window.location.href + '#' + htmlTag[i].substring(8, htmlTag[i].indexOf('>') - 1),
          base: htmlTag[i].substring(htmlTag[i].indexOf('>') + 1, htmlTag[i].lastIndexOf('<'))
        });
      }
    }
    console.log(this.headingTag);
    return marked(content, {sanitize: true, tables: true}).replace(/<img/g, '<img style="max-width:100%"');
  }

  countViewOfArticle() {
    let self = this;
    setTimeout(function(){
      self.articleService.viewCount(self.article.articleId).subscribe(
        article => {
          self.article.viewCount = article.viewCount;
        });
      }, 10000);
  }

  backClicked() {
    this._location.back();
  }

  interact(type: string, value: number) {
    if (this.article.userId === this.currentUser.userId) {
      this.toastrService.showErrorToastr('message.interact.error');
      return;
    }

    if (type === 'rating') {
      this.myInteract.rating = value;
      if (value === 1) {
        this.toastrService.showSuccessToastr('message.interact.upvote');
      } else if (value === -1) {
        this.toastrService.showWarningToastr('message.interact.downvote');
      }
    } else if (type === 'bookmark') {
      if (this.myInteract.bookmark === 0) {
        this.myInteract.bookmark = 1;
        this.toastrService.showSuccessToastr('message.interact.bookmark');
      } else if (this.myInteract.bookmark === 1) {
        this.myInteract.bookmark = 0;
        this.toastrService.showWarningToastr('message.interact.unbookmark');
      }
    }

    this.articleInteractService.interact(this.myInteract).subscribe(
      data => {
        console.log(data);
        this.getListInteract();
      }
    );
  }

  report() {
    if (this.article.userId === this.currentUser.userId) {
      this.toastrService.showErrorToastr('message.report.error');
    } else {
      this.myReport.articleId = this.article.articleId;
      this.myReport.userId = this.currentUser.userId;
      this.reportArticleService.report(this.myReport).subscribe();
    }
    $('[data-dismiss=modal]').trigger({type: 'click'});
    $('#txtReason').val('');
  }

  getListInteract() {
    this.articleInteractService.getListArticleInteract(this.article.articleId).subscribe(
      interacts => {
        this.listInteracts = interacts;
        this.rating = 0;
        this.bookmarkCount = 0;
        console.log(this.listInteracts);
        for (let i = 0; i < this.listInteracts.length; i++) {
          if (this.listInteracts[i].userId === this.currentUser.userId) {
            this.myInteract.rating = this.listInteracts[i].rating;
            this.myInteract.bookmark = this.listInteracts[i].bookmark;
            this.myInteract.share = this.listInteracts[i].share;
          }
          this.rating += this.listInteracts[i].rating;
          this.bookmarkCount += this.listInteracts[i].bookmark;
        }
      }
    );
  }

  getAuthorInfo(userId: string) {
    this.userService.getUser(userId).subscribe(
      author => {
        this.author.userId = author.userId;
        this.author.role = author.role;
        this.author.email = author.email;
        this.author.createDate = author.createDate;
        this.author.userName = author.userName;
      }
    );

    this.profileService.get(this.article.userId).subscribe(
      author => {
        this.author.firstName = author.firstName;
        this.author.lastName = author.lastName;
        this.author.userProfileId = author.userProfileId;
      }
    );
  }

  getProfile(userId: string){
    let obj = {
      userId: "",
      userName: "",
      firstName: "",
      lastName: "",
      userProfileId: ""
    };
    this.userService.getUser(userId).subscribe(
      author => {
        obj.userId = author.userId;
        obj.userName = author.userName;
      }
    );

    this.profileService.get(this.article.userId).subscribe(
      author => {
        obj.firstName = author.firstName;
        obj.lastName = author.lastName;
        obj.userProfileId = author.userProfileId;
      }
    );
    return obj;
  }

  addComment(parentId: string){
    // clear text in comment box
    $('#txtNewComment').val("");

    this.newComment.articleId = this.article.articleId;
    this.newComment.userId = this.currentUser.userId;
    this.newComment.parentId = parentId;
    this.commentService.addComment(this.newComment).subscribe();

    this.getCommentsInArticle(this.article, this.pageNumber, this.pageSize);
  }

  getCommentsInArticle(articleId: string, pageNumber: number, pageSize: number){
    this.commentService.getListComment(articleId,pageNumber,pageSize).subscribe(
      comments => {
        if(comments != null) {
          this.commentCount = 0;
          for(let i = 0; i < comments.length; i++) {
            this.commentCount++;
            comments[i].userDetail = this.getProfile(comments[i].userId);
            if(comments.childComments != null) {
              for(let j = 0; j < comments.childComments.length; j++) {
                this.commentCount++;
                comments.childComments[j].userDetail = this.getProfile(comments.childComments[j].userId);
              }
            }
          }
          this.listComments = comments;
        }
      }
    );
  }
}
