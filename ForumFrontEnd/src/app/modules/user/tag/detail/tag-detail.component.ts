import {Component, OnInit} from '@angular/core';
import {ArticleService, CustomToastrService, ProfilesService, TagService, TranslateService, UserService} from '../../../../core/services';
import {PieChartConfig, User} from '../../../../core/models';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';


declare var $: any;

@Component({
  selector: 'tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})

export class TagDetailComponent implements OnInit{

  currentUser: User;
  tagInfo: any = {};
  followers: any = []; // list follwers
  articles: any = []; // list articles
  pagingRequestArticle: any = {
    type: 1,
    searchKey: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };
  pagingRequest: any = {
    type: 1,
    searchKey: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };
  collectionSize: number;
  navType = 1;
  followStatus: boolean = false;
  numberOfFollower: number;

  constructor(
    public translateService: TranslateService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastrService: CustomToastrService,
    private profileService: ProfilesService,
    private articleService: ArticleService,
    private titleService: Title
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {

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

      // get current user
      this.userService.currentUser.subscribe(
        (userData) => {

          console.log("Check get current user: ", Object.keys(userData).length !== 0);

          if (Object.keys(userData).length !== 0) {
            this.currentUser = userData;

            // get my follow status with tag
            this.tagService.getFollowStatus(this.currentUser.userId, params['id']).subscribe(
              status => {
                if (status != null) {
                  this.followStatus = true;

                  if(this.followStatus == true) {
                    $('.follow').css('background-color','#34CF7A');
                  }
                }
              }
            )
          }
        });

      // get tag information
      this.tagService.getTagInfomation(params['id']).subscribe(
        info => {

          this.titleService.setTitle(this.translateService.translateLanguage('tag.label.tag_detail') + " : " + info[1]);

          this.tagInfo = info;

          // get list followers
          this.getListFollowers(1);

          // get list articles
          this.getListArticleByType(1,1);

        }
      );

    });

  }

  getListArticleByType(type: number, navType: number) {

    this.navType = navType;
    this.pagingRequestArticle.type = type;
    this.pagingRequestArticle.searchKey = this.tagInfo[0];

    this.tagService.getArticleByTypeAndTagId(this.pagingRequestArticle).subscribe(
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

      }
    );

  }

  getListFollowers(navType: number) {

    this.navType = navType;

    this.pagingRequest.searchKey = this.tagInfo[0];

    this.tagService.getListFollowers(this.pagingRequest).subscribe(
      data => {

        this.followers = data.content;

        this.collectionSize = data.totalElements;

        this.numberOfFollower = data.totalElements;

        for(let i = 0; i < this.followers.length; i++) {
          this.userService.getUser(this.followers[i].id.userId).subscribe(
            author => {
              this.followers[i].userId = author.userId;
              // this.followers[i].role = author.role;
              // this.followers[i].email = author.email;
              this.followers[i].createDate = author.createDate;
              this.followers[i].userName = author.userName;
            }
          );

          this.profileService.get(this.followers[i].id.userId).subscribe(
            author => {
              this.followers[i].firstName = author.firstName;
              this.followers[i].lastName = author.lastName;
              this.followers[i].userProfileId = author.userProfileId;
              this.followers[i].avatar = author.avatar;
            }
          );
        }

      }
    );
  }

  followAction() {
    if(this.followStatus == false) {
      $('.follow').css('background-color','#34CF7A');

      this.tagService.followTag(this.currentUser.userId, this.tagInfo[0]).subscribe(
        status => {
          if(status != null) {
            this.toastrService.showSuccessToastr("tag.message.follow_success");
            this.getListFollowers(this.navType);
          }
        }
      );
    }
    else {
      $('.follow').css('background-color', '#2589cc');

      this.tagService.unfollowTag(this.currentUser.userId, this.tagInfo[0]).subscribe(
        status => {
          if(status != null) {
            this.toastrService.showSuccessToastr("tag.message.unfollow_success");
            this.getListFollowers(this.navType);
          }
        }
      );

    }

    this.followStatus = !this.followStatus;

  }


}
