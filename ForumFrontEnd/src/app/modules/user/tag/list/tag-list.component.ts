import {Component, OnInit} from '@angular/core';
import {TagService, TranslateService, UserService} from '../../../../core/services';
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
    searchKey: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 20
  };

  constructor(
    public translate: TranslateService,
    private tagService: TagService,
    private userService: UserService
  ) {}

  public ngOnInit() {

    // get current user
    this.userService.currentUser.subscribe(
      (userData) => {

        console.log("Check get current user: ", Object.keys(userData).length !== 0);

        if (Object.keys(userData).length !== 0) {
          this.currentUser = userData;

          // get my follow status with tag
          this.getAllTag();
        }
      });

  }

  getAllTag() {
    this.tagService.getAllTags(this.pagingRequest).subscribe(
      tags => {
        this.tagList = tags;
      }
    )
  }

  followAction() {

  }


}
