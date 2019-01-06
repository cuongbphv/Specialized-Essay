import {Component, OnInit} from '@angular/core';

import {AuthBaseService, ProfilesService, SessionService, TagService, TranslateService, UserService} from '../../../../core/services';
// import * as $ from 'jquery';
import {Pattern} from '../../../../shared/constant/index';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'user-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  userInfo : any = {
    lang: "en",
    userName: '',
    emailAddress: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    description: ''
  };

  imgUrl : string;
  isSocialUser: boolean = false;
  step:number = 1;

  tagList = [];
  topAuthor = [];
  followTagId = [];

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
    private route: ActivatedRoute,
    private router: Router,
    private authBaseService: AuthBaseService,
    private userService: UserService,
    private sessionService: SessionService,
    private tagService: TagService,
    private profileService: ProfilesService
  ) {
    this.route.queryParams.subscribe(params => {
      this.userInfo.firstName = params["firstName"];
      this.userInfo.lastName = params["lastName"];
      this.userInfo.emailAddress = params["email"];
      this.userInfo.userId = params["userId"];
      this.userInfo.image = params["image"];
      this.isSocialUser = params["isSocialUser"];

      this.imgUrl = params["image"] || '';
    });
  }


  userNamePattern: any = Pattern.USERNAME_PATTERN;
  phoneNumberPattern: any = Pattern.PHONE_PATTERN;
  namePattern: any = Pattern.NAME_PATTERN;
  emailPattern: any = Pattern.EMAIL_PATTERN;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe( isAuthen => {
      if(isAuthen){
        this.router.navigate(["/"]);
      }
    });

    this.profileService.getTopAuthor()
      .subscribe(data => {
        this.topAuthor = data;

        for(let i = 0 ; i < this.topAuthor.length ; i++){
          this.topAuthor[i].isFollow = false;
        }

      })

  }

  moveStep(value) {

    if (this.step + value >= 1 && this.step + value <= 4) {
      this.step += value;

      if(this.step === 3) {
        // get my follow status with tag
        this.getAllTag('',5,true,1);
      }

    }
  }

  doRegister(){

    let listAuthor = this.topAuthor.filter(obj => obj.isFollow === true);

    let listAuthorId = listAuthor.map(obj => obj.userId);

    console.log('list author ',listAuthorId);

    this.authBaseService.register(this.userInfo, this.followTagId, listAuthorId)
      .subscribe(res => {
      if(res.status === 200){
          console.log("do create profile");
          console.log(res.data);
          this.sessionService.setAccessToken(res.data);
          this.userService.populate();
          this.router.navigate(["/"]);
      }
      });
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files.item(0)) {

      this.userInfo.imgFile = event.target.files.item(0);

      let reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.imgUrl = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
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
    if (followStatus === false) {
      let followed = false;
      for(let i = 0; i < this.followTagId.length; i++) {
        if (this.followTagId[i] === tagId) {
          followed = true;
        }
      }
      if (!followed) {
        this.followTagId.push(tagId);
        let obj = this.tagList.find(obj => obj.tagId === tagId);
        obj.followStatus = true;
      }
    }
    else {
      let obj = this.tagList.find(obj => obj.tagId === tagId);
      obj.followStatus = false;
      for(let i = 0; i < this.followTagId.length; i++) {
        if (this.followTagId[i] === tagId) {
          this.followTagId.splice(i,1);
        }
      }
    }

    console.log(this.followTagId);

  }

  followUser(index : number){

    this.topAuthor[index].isFollow = this.topAuthor[index].isFollow === false;

  }
}
