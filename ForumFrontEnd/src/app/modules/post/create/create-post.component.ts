import { Component } from '@angular/core';

import { TranslateService } from '../../../core/services';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  content: any = {};

  constructor(
    public translate: TranslateService
  ) {}

  preRenderFunc(content: string) {
    return content.replace(/something/g, 'new value'); // must return a string
  }

}
