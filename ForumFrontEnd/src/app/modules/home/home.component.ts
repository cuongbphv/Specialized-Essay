import { Component, OnInit } from '@angular/core';

import { TranslateService } from '../../core/services/translate.service';

@Component({
  selector: 'app-index',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    public translate: TranslateService
  ) {}

  ngOnInit() {}
}
