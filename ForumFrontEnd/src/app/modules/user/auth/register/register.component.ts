import {Component, OnInit} from '@angular/core';

import {AuthBaseService, SessionService, TranslateService, UserService} from '../../../../core/services';
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
    description: '',
  };

  imgUrl : string;
  isSocialUser: boolean = false;
  step:number = 1;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private authBaseService: AuthBaseService,
    private userService: UserService,
    private sessionService: SessionService
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
    // this.userService.isAuthenticated.subscribe( isAuthen => {
    //   if(isAuthen){
    //     this.router.navigate(["/"]);
    //   }
    // })
  }

  moveStep(value) {

    if (this.step + value >= 1 && this.step + value <= 4) {
      this.step += value;
    }
  }

  doRegister(){

    this.authBaseService.register(this.userInfo)
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

}
