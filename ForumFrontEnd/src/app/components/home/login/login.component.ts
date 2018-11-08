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

  }


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
