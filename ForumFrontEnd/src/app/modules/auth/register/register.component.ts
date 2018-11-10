import {Component, OnInit} from '@angular/core';

import {AuthBaseService, TranslateService} from '../../../core/services';
import {Pattern} from '../../../shared/constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  namePattern: any = Pattern.NAME_PATTERN;
  usernamePattern: any = Pattern.USERNAME_PATTERN;
  emailPattern: any = Pattern.EMAIL_PATTERN;

  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  };

  constructor(
    public translate: TranslateService,
    private authBaseService: AuthBaseService
  ) {}

  ngOnInit() {}

  userRegister() {
    this.authBaseService.register(this.user)
      .subscribe(data => console.log(data));
  }
}
