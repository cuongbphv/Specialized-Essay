import {Component, OnInit} from '@angular/core';

import {ArticleService, TranslateService, UserService} from '../../../core/services';
import * as $ from 'jquery';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../core/models';

@Component({
  selector: 'edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})

export class EditPostComponent implements OnInit {

  currentUser: User;

  post: any = {
    articleId: '',
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
    public router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

    this.route.params.subscribe(params => {
      this.articleService.getDetailPost(params['id']).subscribe(
        data => {
          if (this.currentUser.userId !== data.userId) {
            this.router.navigate(["/post" + this.post.articleId]);
          }
          this.post.articleId = data.articleId;
          this.post.title = data.title;
          this.post.userId = data.userId;
          for(let i = 0; i < data.tagList.length; i++) {
            this.post.tags.push(data.tagList[i].tagName);
          }
          this.post.content = data.content;
          this.post.type = data.type;
        }
      );
    });

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

  updateArticle() {
    this.post.userId = this.currentUser.userId;

    this.articleService.updatePost(this.post).subscribe(
      data => {
        this.router.navigate(["/post/" + data.articleId]);
      });
  }
}
