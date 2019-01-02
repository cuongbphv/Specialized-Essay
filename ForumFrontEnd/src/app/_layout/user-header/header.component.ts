import {Component, OnInit} from '@angular/core';

import {AuthBaseService, UserService, SearchService} from '../../core/services';
import { ToastrService } from 'ngx-toastr';
import {User} from '../../core/models';
import {NavigationExtras, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  pagingRequest: any = {
    type: 5, // type for search only tag name
    searchKey: '',
    sortCase: 1,
    ascSort: true,
    pageNumber: 1,
    pageSize: 10
  };

  articleResults = [];
  questionResults = [];
  tagResults = [];

  constructor(
    public authBaseService: AuthBaseService,
    private toastr: ToastrService,
    public userService: UserService,
    private seacrhService: SearchService,
    public router: Router
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

    var $result = $('.sb__suggestions');

    $(document).mouseup(function (e) {
      if (!$result.is(e.target) // if the target of the click isn't the container...
        && $result.has(e.target).length === 0) // ... nor a descendant of the container
      {
        $result.hide();
      }
    });

  }

  setLang(lang) {
    if(lang === 'en') {
      this.toastr.success('', "Change language to English successfully!");
    }
    else if (lang === 'vi') {
      this.toastr.success('', "Thay đổi ngôn ngữ sang Tiếng Việt thành công!");
    }
  }

  searchByKeyword() {
    this.seacrhService.searchTop(this.pagingRequest).subscribe(
      data => {

        console.log(data);

        this.articleResults = data.articleResults;
        this.questionResults = data.questionResults;
        this.tagResults = data.tagResults;

        if(this.pagingRequest.searchKey === '') {
          this.tagResults = [];
        }

        if(this.articleResults.length > 0 || this.questionResults.length > 0 || this.tagResults.length > 0) {
          $('.sb__suggestions').show();
        }
      }
    )
  }

  searchWithKeyword() {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        keyword: encodeURIComponent(this.pagingRequest.searchKey)
      }
    };

    this.router.navigate(["search"], navigationExtras);
  }
}
