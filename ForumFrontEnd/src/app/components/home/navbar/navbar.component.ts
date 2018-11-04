import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '../../../shared/services/translate.service';
import { AuthService } from '../../../shared/services/authenticate.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    public translate: TranslateService,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  setLang(lang: string) {
    this.translate.use(lang).then(() => {});
  }
}
