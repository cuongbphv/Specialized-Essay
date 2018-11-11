import { Component, OnInit } from '@angular/core';

import { TranslateService, AuthBaseService } from '../../../core/services';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    public authBaseService: AuthBaseService
  ) {}

  ngOnInit() {}

  setLang() {}
}
