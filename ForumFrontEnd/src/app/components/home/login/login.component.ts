import { Component, OnInit } from '@angular/core';

import { TranslateService } from '../../../shared/services/translate.service';
import { AuthService } from '../../../shared/services/authenticate.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
    private authService: AuthService
  ) {}
  ngOnInit() {}
  loginByUsername(userForm: NgForm) {
    this.loading = true;
    this.authService.login(this.userLogin.username, this.userLogin.password)
      .subscribe(
        data => {
          // this.router.navigate(['/home']);
        },
        error => {
          this.loading = false;
        });
  }
}
