import {Component, OnInit} from '@angular/core';

import {AuthBaseService, TranslateService, UserService} from '../../../core/services';
import * as $ from 'jquery';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit {

  post: any = {
    title: '',
    content: '',
    tags: [],
    userId: ''
  };

  constructor(
    public translate: TranslateService,
    public userService: UserService
  ) {

  }

  ngOnInit() {
    let self = this;
    $('input[data-role=\'add-tag\']').keypress(function (event) {
      if (event.which == 13 || event.which == 44) { // key enter and key ","
        event.preventDefault();
        let elem = $('input[data-role=\'add-tag\']');
        if(self.post.tags.length < 5 && !self.checkDuplicate(elem.val()) && elem.val() !== "") {
          self.post.tags.push(elem.val().trim());
          elem.val("");
        }
      }
    });
  }

  removeTag(i: number) {
    this.post.tags.splice(i,1);
  }

  checkDuplicate(tag: string) {
    return this.post.tags.includes(tag);
  }

}
