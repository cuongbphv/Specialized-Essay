import {Component, OnInit} from '@angular/core';

import {TranslateService} from '../../../shared/services/translate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: any = {
    fullName: '',
    email: '',
    username: '',
    career: 'Developer',
    password: '',
    confirmPassword: ''
  };

  constructor(
    public translate: TranslateService
  ) {}

  compareObjects(o1: any, o2: any): boolean {
    return o1.career === o2.career;
  }

  ngOnInit() {}

  onSubmit() {

  }
}
