import { Component, OnInit } from '@angular/core';

import { TranslateService, AuthBaseService } from '../../../core/services';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public translateService: TranslateService,
    public authBaseService: AuthBaseService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  setLang() {
    this.toastr.success('', "Thay đổi ngôn ngữ thành công " + this.translateService.data.language.vi);
  }
}
