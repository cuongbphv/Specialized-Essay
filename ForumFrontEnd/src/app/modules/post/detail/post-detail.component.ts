import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {
  ArticleInteractService,
  ArticleService, CommentService,
  CustomToastrService, ModalService, ProfilesService, ReportArticleService, ReportCommentService, TranslateService,
  UserService
} from '../../../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import marked from 'marked';
import {User,Comment} from '../../../core/models';

declare var $ : any;

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
  myCommentReport: any = {
    commentId: '',
    userId: '',
    reason: ''
  };
  currentUser: User;
  newComment: Comment;
  listComments = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  contentComment = "";
  commentId = "";
  listRelatedArticle = [];
  listTheSameAuthorArticle = [];

  constructor(
    public articleService: ArticleService,
    private articleInteractService: ArticleInteractService,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastrService: CustomToastrService,
    private modalService: ModalService,
    private reportArticleService: ReportArticleService,
    private reportCommentService: ReportCommentService,
    private profileService: ProfilesService,
    public translateService: TranslateService,
    private commentService: CommentService,
    private _location: Location,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    $(document).ready(function () {
      window.addEventListener("scroll", function (event) {

        // var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight,
        //   document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
        //
        // if(this.scrollY > limit - $('#sidebar').height()) {
        //
        // }
        //
        // console.log(document.documentElement.scrollHeight);

      });
    });

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

          // get realted article
          let tagIds = [];
          for(let i = 0; i < this.article.tagList; i++) {
            tagIds.push(this.article.tagList[i].tagId);
          }
          this.articleService.getRelatedArticle(tagIds, this.article.type).subscribe(
            data => {
              this.listRelatedArticle = data;
            }
          );

          // get article by the same author
          this.articleService.getArticleSameAuthor(this.article.userId, this.article.type).subscribe(
            data => {
              for(let i = 0; i < data.length; i++) {
                this.profileService.get(data[i].userId).subscribe(
                  profile => {
                    data[i].firstName = profile.firstName;
                    data[i].lastName = profile.lastName;
                    data[i].userProfileId = profile.userProfileId;

                    this.articleService.statByArticle(data[i].articleId).subscribe(
                      stat => {
                        data[i].rating = stat.rating;
                        data[i].bookmark = stat.bookmark;
                        data[i].share = stat.share;
                        data[i].commentNum = stat.commentNum;
                      }
                    );
                  }
                );
              }
              this.listTheSameAuthorArticle = data;
            }
          );

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
      }, 20000);
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

  passData(commentId: string, commentUserId: string) {
    if (commentUserId === this.currentUser.userId) {
      this.toastrService.showErrorToastr('message.report_comment.error');
      $('#modal-report-comment').modal('show');
    } else {
      this.myCommentReport.commentId = commentId;
      this.myCommentReport.userId = this.currentUser.userId;
      $('#modal-report-comment').modal('hide');
    }
  }

  reportComment() {
    this.reportCommentService.report(this.myCommentReport).subscribe();
    $('#modal-report-comment').modal('hide');
    $('#txtReasonComment').val('');
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

  addComment(parentId: string, reply: boolean, id: string){

    if(reply) {
      this.newComment.content = $(id).val();
    }

    this.newComment.articleId = this.article.articleId;
    this.newComment.userId = this.currentUser.userId;
    this.newComment.parentId = parentId;
    this.commentService.addComment(this.newComment).subscribe(
      newComment => {
        if(newComment != null){
          if(newComment.parentId != null){
            for(let i = 0; i < this.listComments.length; i++) {
              if(this.listComments[i].commentId === newComment.parentId) {
                // get profile
                this.userService.getUser(newComment.userId).subscribe(
                  author => {

                    let obj = {
                      userId: newComment.userId,
                      userName: "",
                      firstName: "",
                      lastName: "",
                      userProfileId: ""
                    };

                    obj.userName = author.userName;

                    this.profileService.get(newComment.userId).subscribe(
                      profile => {
                        obj.firstName = profile.firstName;
                        obj.lastName = profile.lastName;
                        obj.userProfileId = profile.userProfileId;

                        newComment.userDetail = obj;
                        newComment.commentBox = [];
                        newComment.childComments = [];


                        this.listComments[i].childComments.push(newComment);
                      }
                    );
                  }
                );
              }
            }
          }
          else {
            // get profile
            this.userService.getUser(newComment.userId).subscribe(
              author => {

                let obj = {
                  userId: newComment.userId,
                  userName: "",
                  firstName: "",
                  lastName: "",
                  userProfileId: ""
                };

                obj.userName = author.userName;

                this.profileService.get(newComment.userId).subscribe(
                  profile => {
                    obj.firstName = profile.firstName;
                    obj.lastName = profile.lastName;
                    obj.userProfileId = profile.userProfileId;

                    newComment.userDetail = obj;
                    newComment.commentBox = [];
                    newComment.childComments = [];

                    this.listComments.push(newComment);
                  }
                );
              });
          }
        }
      }
    );

    $('#txtNewComment').val("");
    $(id).val("");

    // this.getCommentsInArticle(this.article, this.pageNumber, this.pageSize);
  }

  openModalUpdateComment(commentId: string, content: string) {
    this.contentComment = content;
    this.commentId = commentId;
    $('#modal-update-comment').modal('hide');
  }

  updateComment(commentId: string, content: string) {
    this.commentService.updateComment(commentId, content).subscribe(
      data => {
        if (data != null) {
          this.getCommentsInArticle(this.article.articleId,this.pageNumber,this.pageSize);
          $('#modal-update-comment').modal('hide');
        }
      }
    )
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe(
      data => {
        if (data != null) {
          this.getCommentsInArticle(this.article.articleId,this.pageNumber,this.pageSize);
        }
      }
    )
  }

  getCommentsInArticle(articleId: string, pageNumber: number, pageSize: number){
    this.commentService.getListComment(articleId,pageNumber,pageSize).subscribe(
      comments => {
        if(comments != null) {
          this.commentCount = 0;
          for(let i = 0; i < comments.length; i++) {
            this.commentCount++;
            comments[i].commentBox = [];

            // get profile
            this.userService.getUser(comments[i].userId).subscribe(
              author => {

                let obj = {
                  userId: comments[i].userId,
                  userName: "",
                  firstName: "",
                  lastName: "",
                  userProfileId: ""
                };

                obj.userName = author.userName;

                this.profileService.get(comments[i].userId).subscribe(
                  profile => {
                    obj.firstName = profile.firstName;
                    obj.lastName = profile.lastName;
                    obj.userProfileId = profile.userProfileId;
                    comments[i].userDetail = obj;
                  }
                );
              }
            );

            if(comments[i].childComments !== null) {
              for(let j = 0; j < comments[i].childComments.length; j++) {
                this.commentCount++;

                // get profile
                this.userService.getUser(comments[i].childComments[j].userId).subscribe(
                  author => {

                    let obj = {
                      userId: comments[i].childComments[j].userId,
                      userName: "",
                      firstName: "",
                      lastName: "",
                      userProfileId: ""
                    };

                    obj.userName = author.userName;

                    this.profileService.get(comments[i].childComments[j].userId).subscribe(
                      profile => {
                        obj.firstName = profile.firstName;
                        obj.lastName = profile.lastName;
                        obj.userProfileId = profile.userProfileId;
                        comments[i].childComments[j].userDetail = obj;
                      }
                    );
                  }
                );

              }
            }
          }

          this.listComments = comments;

        }
      }
    );
  }

  markAsResolved(rightAnswerId: string){
    if(this.article.rightAnswerId === null) {
      this.articleService.markAsResolved(this.article.articleId, rightAnswerId).subscribe(
        data => {
          this.article.rightAnswerId = data.rightAnswerId;
        }
      );
    }
    else {
      this.toastrService.showWarningToastr('message.resolved.existed');
    }
  }

  addCommentBox(index: number, parentId: string){
    if(this.listComments[index].commentBox.length === 0) {
      this.listComments[index].commentBox.push("comment-box-"+parentId);
    }
  }

  removeCommentBox(index){
    this.listComments[index].commentBox = [];
  }

}
