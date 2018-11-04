import { Component, OnInit } from '@angular/core';

import { TranslateService } from '../../../shared/services/translate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    public translate: TranslateService
  ) {}

  ngOnInit() {}
}
