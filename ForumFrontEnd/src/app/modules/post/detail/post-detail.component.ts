import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {
  ArticleInteractService,
  ArticleService,
  CustomToastrService, ModalService, ReportArticleService,
  UserService
} from '../../../core/services';
import {ActivatedRoute} from '@angular/router';
import marked from 'marked';
import {User} from '../../../core/models';

import * as $ from 'jquery';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  rating: number = 0;
  bookmark: number = 0;
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

  constructor(
    public articleService: ArticleService,
    private articleInteractService: ArticleInteractService,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastrService: CustomToastrService,
    private modalService: ModalService,
    private reportArticleService: ReportArticleService,
    private _location: Location
  ) {
  }

  ngOnInit(): void {

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
          this.userService.getUser(this.article.userId).subscribe(
            author => {
              this.author = author;
            }
          );

          // Interact
          this.myInteract.articleId = this.article.articleId;
          this.myInteract.userId = this.currentUser.userId;
          this.getListInteract();

          // Comment
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
    }
    else {
      this.myReport.articleId = this.article.articleId;
      this.myReport.userId = this.currentUser.userId;
      this.reportArticleService.report(this.myReport).subscribe();
    }
    $("[data-dismiss=modal]").trigger({ type: "click" });
    $('#txtReason').val("");
  }

  getListInteract() {
    this.articleInteractService.getListArticleInteract(this.article.articleId).subscribe(
      interacts => {
        this.listInteracts = interacts;
        this.rating = 0;
        this.bookmark = 0;
        console.log(this.listInteracts);
        for (let i = 0; i < this.listInteracts.length; i++) {
          if (this.listInteracts[i].userId === this.currentUser.userId) {
            this.myInteract.rating = this.listInteracts[i].rating;
            this.myInteract.bookmark = this.listInteracts[i].bookmark;
            this.myInteract.share = this.listInteracts[i].share;
          }
          this.rating += this.listInteracts[i].rating;
          this.bookmark += this.listInteracts[i].bookmark;
        }
      }
    );
  }
}
