import {Component, OnInit} from '@angular/core';

import {ArticleService, TranslateService, UserService} from '../../../core/services';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import {User} from '../../../core/models';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit {

  currentUser: User;

  post: any = {
    title: '',
    content: '',
    tags: [],
    userId: '',
    type: 1
  };

  constructor(
    public translate: TranslateService,
    public articleService: ArticleService,
    private userService: UserService,
    public router: Router
  ) {
  }

  ngOnInit() {

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

    let self = this;
    $('input[data-role=\'add-tag\']').keypress(function (event) {
      if (event.which == 13 || event.which == 44) { // key enter and key ","
        event.preventDefault();
        let elem = $('input[data-role=\'add-tag\']');
        if (self.post.tags.length < 5 && !self.checkDuplicate(elem.val()) && elem.val() !== '') {
          self.post.tags.push(elem.val().trim());
          elem.val('');
        }
      }
    });
  }

  removeTag(i: number) {
    this.post.tags.splice(i, 1);
  }

  checkDuplicate(tag: string) {
    return this.post.tags.includes(tag);
  }

  createArticle() {

    console.log(this.userService);
    this.post.userId = this.currentUser.userId;

    this.articleService.createPost(this.post).subscribe(
      response => {
        if (response.status === 200) {
          this.router.navigate(["/post/" + response.data.articleId]);
        }
      });
  }
}
