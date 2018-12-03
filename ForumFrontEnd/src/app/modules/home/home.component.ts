import { Component, OnInit } from '@angular/core';

import { TranslateService } from '../../core/services';

@Component({
  selector: 'app-index',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isOpenCategories: boolean = false;
  isOpenTags: boolean = false;
  constructor(
    public translate: TranslateService
  ) {}

  ngOnInit() {}

  openCategories() {
    this.isOpenCategories = !this.isOpenCategories;
  }

  openTags() {
    this.isOpenTags = !this.isOpenTags;
  }

}
