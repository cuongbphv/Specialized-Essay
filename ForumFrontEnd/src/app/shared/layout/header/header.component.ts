import {Component, OnInit} from '@angular/core';

import {AuthBaseService, UserService} from '../../../core/services';
import { ToastrService } from 'ngx-toastr';
import {User} from '../../../core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(
    public authBaseService: AuthBaseService,
    private toastr: ToastrService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  setLang(lang) {
    if(lang === 'en') {
      this.toastr.success('', "Change language to English successfully!");
    }
    else if (lang === 'vi') {
      this.toastr.success('', "Thay đổi ngôn ngữ sang Tiếng Việt thành công!");
    }
  }
}
