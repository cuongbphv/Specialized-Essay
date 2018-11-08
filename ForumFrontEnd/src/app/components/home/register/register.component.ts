import {Component, OnInit} from '@angular/core';

import {AuthBaseService} from '../../../shared/services/authenticate.service';
import {TranslateService} from '../../../shared/services/translate.service';
import {Pattern} from '../../../shared/constant/pattern.constant';
import {RegisterService} from './register.service';

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
    private registerService: RegisterService
  ) {}

  // compareObjects(o1: any, o2: any): boolean {
  //   return o1.career === o2.career;
  // }

  ngOnInit() {}

  userRegister() {
    this.registerService.createUser(this.user)
      .subscribe(data => console.log(data));
  }
}
