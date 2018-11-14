import { Component, OnInit } from '@angular/core';

import { AuthBaseService } from '../../../core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public authBaseService: AuthBaseService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  setLang(lang) {
    if(lang === 'en') {
      this.toastr.success('', "Change language to English successfully!");
    }
    else if (lang === 'vi') {
      this.toastr.success('', "Thay đổi ngôn ngữ sang Tiếng Việt thành công!");
    }
  }
}
