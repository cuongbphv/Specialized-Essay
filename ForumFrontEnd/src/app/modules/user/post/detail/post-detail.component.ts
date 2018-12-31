import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Title} from "@angular/platform-browser";

import {
  ArticleInteractService,
  ArticleService, CommentService,
  CustomToastrService, ModalService, ProfilesService, ReportArticleService, ReportCommentService, TranslateService,
  UserService
} from '../../../../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import {User,Comment} from '../../../../core/models';
import { NgxSpinnerService } from 'ngx-spinner';

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
  listUserInModal = [];

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
    private router: Router,
    private spinner: NgxSpinnerService,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {

    $(document).scroll(function() {

      if ($('body').innerWidth() > 800){
        let y = $(this).scrollTop();
        if (y < ( $('#article-area').height() - $('#sidebar').height() ) ) {
          $('#sidebar').fadeIn();
        } else {
          $('#sidebar').fadeOut();
        }
      }
    });

    this.spinner.show();

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

          // set title for post
          this.titleService.setTitle(data.title);

          // Content data
          data.content = this.preRenderMarkdown(data.content);

          $("table").addClass("table table-condensed table-bordered table-hover");
          $("#table-same-author").removeClass("table-condensed table-bordered table-hover");


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
                    data[i].avatar = profile.avatar;

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

          this.spinner.hide();
        }
      );
    });
  }

  preRenderMarkdown(content: string) {

    // setting for highlight code
    // Create your custom renderer.
    const renderer = new Renderer();
    renderer.code = (code, language) => {
      // Check whether the given language is valid for highlight.js.
      const validLang = !!(language && highlightjs.getLanguage(language));
      // Highlight only if the language is valid.
      const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
      // Render the highlighted code with `hljs` class.
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    };

    let self = this;

    renderer.heading = function(text, level) {
      var slug = text.toLowerCase().replace(/[^\w]+/g, '-');
      self.headingTag.push({
        level: level,
        slug: slug,
        title: text
      });

      return "<h" + level + " id=\"" + slug + "\"><a href=\"#" + slug + "\" class=\"anchor\"></a>" + text + "</h" + level + ">";
    };

    return marked(content, {
      renderer: renderer,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    }).replace(/<img/g, '<img style="max-width:100%"');
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
      for(let i = 0; i < this.listInteracts.length; i++) {
        if(this.listInteracts[i].id.userId === this.currentUser.userId){
          if(this.listInteracts[i].rating === value) {
            this.toastrService.showErrorToastr('message.interact.before');
            return;
          }
        }
      }

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
        this.author.avatar = author.avatar;
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
          this.getCommentsInArticle(this.article.articleId,this.pageNumber,this.pageSize);
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

            // get list interact to comment
            this.commentService.getListInteract(comments[i].commentId).subscribe(
              data => {
                comments[i].listInteract = data;
                if(comments[i].listInteract.find(obj => obj.id.userId === this.currentUser.userId)) {
                  comments[i].myInteract = true;
                }
                else {
                  comments[i].myInteract = false;
                }
              });

            // get profile
            this.userService.getUser(comments[i].userId).subscribe(
              author => {

                let obj = {
                  userId: comments[i].userId,
                  userName: "",
                  firstName: "",
                  lastName: "",
                  userProfileId: "",
                  avatar: ""
                };

                obj.userName = author.userName;

                this.profileService.get(comments[i].userId).subscribe(
                  profile => {
                    obj.firstName = profile.firstName;
                    obj.lastName = profile.lastName;
                    obj.userProfileId = profile.userProfileId;
                    obj.avatar = profile.avatar;
                    comments[i].userDetail = obj;
                  }
                );
              }
            );

            if(comments[i].childComments !== null) {
              for(let j = 0; j < comments[i].childComments.length; j++) {
                this.commentCount++;

                // get list interact to comment
                this.commentService.getListInteract(comments[i].childComments[j].commentId).subscribe(
                  data => {
                    comments[i].childComments[j].listInteract = data;
                    if(comments[i].childComments[j].listInteract.find(obj => obj.id.userId === this.currentUser.userId)) {
                      comments[i].childComments[j].myInteract = true;
                    }
                    else {
                      comments[i].childComments[j].myInteract = false;
                    }
                  });

                // get profile
                this.userService.getUser(comments[i].childComments[j].userId).subscribe(
                  author => {

                    let obj = {
                      userId: comments[i].childComments[j].userId,
                      userName: "",
                      firstName: "",
                      lastName: "",
                      userProfileId: "",
                      avatar: ""
                    };

                    obj.userName = author.userName;

                    this.profileService.get(comments[i].childComments[j].userId).subscribe(
                      profile => {
                        obj.firstName = profile.firstName;
                        obj.lastName = profile.lastName;
                        obj.userProfileId = profile.userProfileId;
                        obj.avatar = profile.avatar;
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

  interactToComment(commentId: string, interactStatus: boolean) {
    let heart = 0;
    if(!interactStatus) {
      heart = 1;
    }
    this.commentService.interactToComment(commentId, this.currentUser.userId, heart).subscribe(
      data => {
          this.getCommentsInArticle(this.article.articleId,this.pageNumber,this.pageSize);
      }
    )
  }

  markAsResolved(rightAnswerId: string){

    if(this.currentUser.userId !== this.article.userId) {
      this.toastrService.showWarningToastr('message.resolved.not_author');
      return;
    }
    
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

  scrollToHeading(slug: string) {

    $('.clickable').click(function () {
      $('html, body').animate({
        scrollTop: $('#' + slug).offset().top - 60
      }, 0);
    });
  }

  passDataToUserModal(type: number, commentId?:string){

    this.listUserInModal = []; // reset if use the same modal box

    if(type === 1) { // bookmark list
      for(let i = 0; i < this.listInteracts.length; i++) {

        if (this.listInteracts[i].bookmark === 1) {
          // get profile
          this.userService.getUser(this.listInteracts[i].id.userId).subscribe(
            author => {

              let obj = {
                userId: this.listInteracts[i].id.userId,
                userName: "",
                firstName: "",
                lastName: "",
                userProfileId: "",
                avatar: ""
              };

              obj.userName = author.userName;

              this.profileService.get(this.listInteracts[i].id.userId).subscribe(
                profile => {
                  obj.firstName = profile.firstName;
                  obj.lastName = profile.lastName;
                  obj.userProfileId = profile.userProfileId;
                  obj.avatar = profile.avatar;
                  this.listUserInModal.push(obj);
                }
              );
            }
          );
        }
      }
    }
    else if (type === 2) { // rating list
      for(let i = 0; i < this.listInteracts.length; i++) {

        if (this.listInteracts[i].rating !== 0) {
          // get profile
          this.userService.getUser(this.listInteracts[i].id.userId).subscribe(
            author => {

              let obj = {
                userId: this.listInteracts[i].id.userId,
                userName: "",
                firstName: "",
                lastName: "",
                userProfileId: "",
                avatar: ""
              };

              obj.userName = author.userName;

              this.profileService.get(this.listInteracts[i].id.userId).subscribe(
                profile => {
                  obj.firstName = profile.firstName;
                  obj.lastName = profile.lastName;
                  obj.userProfileId = profile.userProfileId;
                  obj.avatar = profile.avatar;
                  this.listUserInModal.push(obj);
                }
              );
            }
          );
        }
      }
    }
    else if (type === 3) { // heart in comment list

      let commentObj;

      for(let i = 0; i < this.listComments.length; i++) {
        if(this.listComments[i].commentId === commentId) {
          commentObj = this.listComments[i];
        }
      }

      if(commentObj === undefined) {
        for(let i = 0; i < this.listComments.length; i++) {
          for(let j = 0; j < this.listComments[i].childComments.length; j++) {
            if(this.listComments[i].childComments[j].commentId === commentId) {
              commentObj = this.listComments[i].childComments[j];
            }
          }
        }
      }

      console.log(commentObj);

      for(let j = 0; j < commentObj.listInteract.length; j++) {
        // get profile
        this.userService.getUser(commentObj.listInteract[j].id.userId).subscribe(
          author => {

            let obj = {
              userId: commentObj.listInteract[j].id.userId,
              userName: "",
              firstName: "",
              lastName: "",
              userProfileId: "",
              avatar: ""
            };

            obj.userName = author.userName;

            this.profileService.get(commentObj.listInteract[j].id.userId).subscribe(
              profile => {
                obj.firstName = profile.firstName;
                obj.lastName = profile.lastName;
                obj.userProfileId = profile.userProfileId;
                obj.avatar = profile.avatar;
                this.listUserInModal.push(obj);
              }
            );
          }
        );
      }

    }
  }
}
