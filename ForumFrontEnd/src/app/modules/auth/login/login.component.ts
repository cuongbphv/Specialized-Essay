import {Component, OnInit} from '@angular/core';

import { TranslateService, AuthBaseService } from '../../../core/services';
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
    private authBaseService: AuthBaseService
  ) {}


  ngOnInit() {

  }

  socialSignIn(provider: string) {
    this.authBaseService.socialSignIn(provider);
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
