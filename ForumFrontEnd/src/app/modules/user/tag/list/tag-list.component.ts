import {Component, OnInit} from '@angular/core';
import {CustomToastrService, TagService, TranslateService, UserService} from '../../../../core/services';
import {User} from '../../../../core/models';


declare var $: any;

@Component({
  selector: 'tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})

export class TagListComponent implements OnInit{

  currentUser: User;

  tagList = [];

  pagingRequest: any = {
    type: 1,
    userId: '',
    searchKey: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 20
  };

  constructor(
    public translate: TranslateService,
    private tagService: TagService,
    private userService: UserService,
    private toastrService: CustomToastrService
  ) {}

  public ngOnInit() {

    // get current user
    this.userService.currentUser.subscribe(
      (userData) => {

        if (Object.keys(userData).length !== 0) {
          this.currentUser = userData;

          this.pagingRequest.userId = this.currentUser.userId;

          // get my follow status with tag
          this.getAllTag('',5,true,1);
        }
      });

  }

  getAllTag(searchKey: string, sortCase: number, ascSort: boolean, pageNumber: number) {

    this.pagingRequest.searchKey = searchKey;
    this.pagingRequest.sortCase = sortCase;
    this.pagingRequest.ascSort = ascSort;
    this.pagingRequest.pageNumber = pageNumber;

    this.tagService.getAllTags(this.pagingRequest).subscribe(
      tags => {
        this.tagList = tags;
        console.log(this.tagList);
      }
    )
  }

  followAction(tagId: string, followStatus: boolean) {
    let elem = '#' + tagId;
    if (followStatus == false) {
      this.tagService.followTag(this.currentUser.userId, tagId).subscribe(
        status => {
          if (status != null) {
            this.toastrService.showSuccessToastr("tag.message.follow_success");
            this.getAllTag(this.pagingRequest.searchKey,this.pagingRequest.sortCase,
                  this.pagingRequest.ascSort,this.pagingRequest.pageNumber);
            return;
          }
        }
      );
    } else {
      this.tagService.unfollowTag(this.currentUser.userId, tagId).subscribe(
        status => {
          if (status != null) {
            this.toastrService.showSuccessToastr("tag.message.unfollow_success");
            this.getAllTag(this.pagingRequest.searchKey,this.pagingRequest.sortCase,
              this.pagingRequest.ascSort,this.pagingRequest.pageNumber);
          }
        }
      );
    }

  }


}
