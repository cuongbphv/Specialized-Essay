import { Component } from '@angular/core';

import { TranslateService } from '../../../core/services';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {


  constructor(
    public translate: TranslateService
  ) {}


}
