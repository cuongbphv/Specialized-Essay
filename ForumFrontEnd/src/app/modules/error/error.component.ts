import { Component, OnInit } from '@angular/core';

import { TranslateService } from '../../core/services';

declare var $: any;

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(
    public translate: TranslateService
  ) {}

  ngOnInit() {
  }

}
