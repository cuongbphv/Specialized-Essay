import {Component, OnInit} from '@angular/core';

import {TranslateService, AuthBaseService, UserService} from '../../../core/services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
    private userService : UserService
  ) {}


  ngOnInit() {

  }

  async socialSignIn(provider: string) {

    let socialUser = await this.authBaseService.socialSignIn(provider);
    this.authBaseService.checkExistedEmail(socialUser.email)
      .subscribe(res => {
        let existedEmail = (res.status === 200);

        if (!existedEmail) {
          let registerUser: any = {
            firstName: socialUser.name.substring(0, socialUser.name.lastIndexOf(' ')),
            lastName: socialUser.name.substring(socialUser.name.lastIndexOf(' ') + 1, socialUser.name.length),
            email: socialUser.email,
            username: '1234567',
            password: '123456'
          };

          this.authBaseService.register(registerUser).subscribe(response => console.log(response));
        }
        else {
          console.log('login');
        }

      });
  }


  loginByUsername(userForm: NgForm) {
    this.loading = true;
    this.authBaseService.login(this.userLogin.username, this.userLogin.password)
      .subscribe(
        data => {
          this.router.navigate(['/profile']);
        },
        error => {
          this.loading = false;
        });
  }
}
