import {Component, OnInit} from '@angular/core';
import {
  TranslateService,
  GooglePieChartService,
  UserService,
  ProfilesService,
  ArticleService,
  CommentService, TagService
} from '../../../core/services';

import {PieChartConfig, Profile, User} from '../../../core/models';
import {Pattern} from '../../../shared/constant';
import {ActivatedRoute} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{

  data: any[];
  config: PieChartConfig;
  elementId: string;
  followStatus: number;

  listTag = [];

  listFollow: Profile[];
  listFollowByOther: Profile[];

  currentUser: User;

  currentProfile: Profile = {
    userId: '',
    userProfileId: '',
    lastName: '',
    firstName: '',
    avatar: '',
    company: '',
    position: '',
    avatarImg: null,
    description: '',
    githubLink: '',
    websiteLink: '',
  };

  pagingRequest: any = {
    type: 1,
    userId: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };

  pagingRequestComment: any = {
    type: 1,
    userId: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };

  pagingRequestBookmark: any = {
    type: 1,
    userId: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };

  userId : string;

  imgUrl: string = null;

  profileMode: number = 1; // 1 info, 2 update

  namePattern: any = Pattern.NAME_PATTERN;

  articles = [];
  comments = [];
  bookmarks = [];
  collectionSize: number;

  constructor(
    public translate: TranslateService,
    private pieChartService: GooglePieChartService,
    private userService:UserService,
    private profileService: ProfilesService,
    private articleService: ArticleService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private tagService: TagService) {}

  public ngOnInit() {

    $(document).ready(function(){

      $(function () {
        $("[data-toggle='tooltip']").tooltip();
      });

      $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
      });

    });

    //this.userId = this.route.snapshot.params['id'];
    this.spinner.show();

    this.route.params.subscribe(params => {
      this.userId = params['id'];

      this.profileService.get(this.userId)
        .subscribe(userProfile => {
          this.currentProfile = userProfile;
          this.imgUrl = userProfile.avatar;

          this.userService.currentUser.subscribe(
            (userData) => {
              this.currentUser = userData;
              this.getFollowStatus();
            }
          );

          this.getUserArticle(1);

          this.data = [['Post', 'Posts per Tag'],
            ['Javascript', 2],
            ['NodeJS',  4],
            ['Spring', 10],
            ['AI', 7]];

          this.config = new PieChartConfig(null, 0.7, 'none', 'none');
          this.elementId = 'myPieChart';

          this.pieChartService.BuildPieChart(this.elementId, this.data, this.config);

          this.getListFollowUser();
          this.getListFollowByOther();
          this.getUserTag();

          this.spinner.hide();

        });

    });

  }

  getUserTag(){
    this.tagService.getTagByUserId(this.currentProfile.userId)
      .subscribe(data => {
        this.listTag = data;
      });
  }


  getListBookmarkArticle(type: number, sortCase: number, ascSort: boolean) {

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

  getUserComment(){

    this.pagingRequestComment.userId = this.userId;

    this.profileService.getUserComment(this.pagingRequestComment).subscribe(
      data => {
        this.comments = data.content;
        this.collectionSize = data.totalElements;

        for (let i = 0; i < this.comments.length; i++) {

          // Author
          this.profileService.get(this.comments[i].userId).subscribe(
            author => {
              this.comments[i].firstName = author.firstName;
              this.comments[i].lastName = author.lastName;
              this.comments[i].userProfileId = author.userProfileId;
              this.comments[i].avatar = author.avatar;
            }
          );

          // get article title
          this.articleService.getDetailPost(this.comments[i].articleId).subscribe(
            article => {
              this.comments[i].articleTitle = article.title;
              this.comments[i].articleType = article.type;
            }
          );

          // get stat comment
          this.commentService.getStatByCommentId(this.comments[i].commentId).subscribe(
            stat => {
              this.comments[i].numOfHeart = stat.numOfHeart;
              this.comments[i].numOfReply = stat.numOfReply;
              this.comments[i].rightAnswer = stat.rightAnswer;
            });

        }

      });
  }

  getUserArticle(type: number) {
    // get default article by userId
    this.pagingRequest.userId = this.userId;
    this.pagingRequest.type = type;

    this.profileService.getUserArticle(this.pagingRequest).subscribe(
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
                  this.articles[i].avatar = author.avatar;
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


  forwardToUpdate(){
    this.profileMode = 2;
  }

  updateProfile(){

    this.profileService.update(this.currentProfile)
      .subscribe(userProfile => {
        this.currentProfile = userProfile;
        console.log("Profile Updated");
        this.profileMode = 1;
      })

  }

  readUrl(event:any) {
    if (event.target.files && event.target.files.item(0)) {

      this.currentProfile.avatarImg = event.target.files.item(0);

      let reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.imgUrl = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getFollowStatus(){
    this.profileService.getFollow(this.currentProfile.userId)
      .subscribe(data => {
        this.followStatus = data;
      });
  }

  follow(){
    this.profileService.follow(this.currentProfile.userId)
      .subscribe(data => {
        this.getFollowStatus()
      });
  }

  unfollow(){
    this.profileService.unfollow(this.currentProfile.userId)
      .subscribe(data => {
        this.getFollowStatus()
      });
  }

  getListFollowUser(){
    this.profileService.getListFollowUser(this.currentProfile.userId)
      .subscribe(data => {
        this.listFollow = data;
        console.log("list follow ", this.listFollow);
      })
  }

  getListFollowByOther(){
    this.profileService.getListFollowByOther(this.currentProfile.userId)
      .subscribe(data => {
        this.listFollowByOther = data;
        console.log("list follow by other ", this.listFollowByOther);
      })
  }

}
