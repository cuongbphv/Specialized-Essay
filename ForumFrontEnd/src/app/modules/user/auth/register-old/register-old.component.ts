import {Component, OnInit} from '@angular/core';

import {AuthBaseService, TranslateService} from '../../../../core/services';
import {Pattern} from '../../../../shared/constant';

@Component({
  selector: 'app-register',
  templateUrl: './register-old.component.html',
  styleUrls: ['./register-old.component.scss']
})
export class RegisterOldComponent implements OnInit {

  namePattern: any = Pattern.NAME_PATTERN;
  usernamePattern: any = Pattern.USERNAME_PATTERN;
  emailPattern: any = Pattern.EMAIL_PATTERN;

  user: any = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    userName: '',
    password: ''
  };

  constructor(
    public translate: TranslateService,
    private authBaseService: AuthBaseService
  ) {}

  ngOnInit() {}

  userRegister() {
    // this.authBaseService.register(this.user)
    //   .subscribe(data => console.log(data));
  }
}
