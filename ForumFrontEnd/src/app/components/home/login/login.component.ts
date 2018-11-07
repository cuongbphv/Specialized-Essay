import {Component, OnInit} from '@angular/core';

import { TranslateService } from '../../../shared/services/translate.service';
import { AuthBaseService } from '../../../shared/services/authenticate.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  userLogin: any = {
    username: '',
    password: ''
  };

  constructor(
    public translate: TranslateService,
    private router: Router,
    private authBaseService: AuthBaseService,
    private socialAuthService: AuthService
  ) {}


  ngOnInit() {

    // (window as any).fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '377313722811067',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v3.2'
    //   });
    //
    //   FB.AppEvents.logPageView();
    //
    // };
    //
    // (function(d, s, id){
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {return;}
    //   js = d.createElement(s); js.id = id;
    //   js.src = "https://connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));

  }

  // submitFBLogin() {
  //   console.log('submit login to facebook');
  //   // FB.login();
  //   FB.login((response) => {
  //     console.log('submitLogin', response);
  //     if (response.authResponse) {
  //       //login success
  //       //login success code here
  //       //redirect to home page
  //
  //       console.log('Login success');
  //       console.log(response);
  //     } else {
  //       console.log('User login failed');
  //     }
  //   });
  // }


  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        // Now sign-in with userData
        // ...

      }
    );
  }

  loginByUsername(userForm: NgForm) {
    this.loading = true;
    this.authBaseService.login(this.userLogin.username, this.userLogin.password)
      .subscribe(
        data => {
          // this.router.navigate(['/home']);
        },
        error => {
          this.loading = false;
        });
  }
}
