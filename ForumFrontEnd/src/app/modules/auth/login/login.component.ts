import {Component, OnInit} from '@angular/core';

import {TranslateService, AuthBaseService, UserService} from '../../../core/services';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  url: string = "/";
  userLogin: any = {
    username: '',
    password: ''
  };

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private authBaseService: AuthBaseService,
    private userService : UserService
  ) {}


  ngOnInit() {
    this.userService.isAuthenticated.subscribe( isAuthen => {
      if(isAuthen){
        this.router.navigate(["/"]);
      }
    });

    this.route.queryParams.subscribe(params => {
      this.url = params["returnUrl"] || "/";
    });
  }

  async socialSignIn(provider: string) {

    let socialUser = await this.authBaseService.socialSignIn(provider);
    this.authBaseService.checkExistedEmail(socialUser.email)
      .subscribe(res => {
        let existedEmail = (res.status === 200);

        if (!existedEmail) {

          console.log(socialUser);

          let navigationExtras: NavigationExtras = {
            queryParams: {
              firstName: socialUser.name.substring(0, socialUser.name.lastIndexOf(' ')),
              lastName: socialUser.name.substring(socialUser.name.lastIndexOf(' ') + 1, socialUser.name.length),
              email: socialUser.email,
              userId: socialUser.id,
              image: socialUser.image,
              isSocialUser: true
            }
          };

          this.router.navigate(["get-started"],navigationExtras);
        }
        else {
          this.authBaseService.socialLogin(socialUser.email, socialUser.token, socialUser.provider, this.url);
        }
      });
  }


  loginByUsername(userForm: NgForm) {
    this.loading = true;
    this.authBaseService.login(this.userLogin.username, this.userLogin.password, this.url);
  }
}
