import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService, ProfilesService, UserService} from '../../../../core/services';

import marked from 'marked';
import {NgxSpinnerService} from 'ngx-spinner';
import {AppConfig} from '../../../../shared/constant';
import {ConfirmationDialogService} from '../../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'admin-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['../../../../app.component.scss','./detail-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailPostComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private profileService: ProfilesService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  article: any = {};
  author: any = {};

  ngOnInit() {

    this.spinner.show();

    this.route.params.subscribe(params => {
      this.articleService.getDetailPost(params['id']).subscribe(
        data => {

          // Content data
          data.content = DetailPostComponent.preRenderMarkdown(data.content);
          this.article = data;

          //Author
          this.getAuthorInfo(this.article.userId);

          this.spinner.hide();
        }
      );
    });
  }

  getAuthorInfo(userId: string) {
    this.userService.getUser(userId).subscribe(
      author => {
        this.author.userId = author.userId;
        this.author.role = author.role;
        this.author.email = author.email;
        this.author.createDate = author.createDate;
        this.author.userName = author.userName;
      }
    );

    this.profileService.get(userId).subscribe(
      author => {
        this.author.firstName = author.firstName;
        this.author.lastName = author.lastName;
        this.author.userProfileId = author.userProfileId;
      }
    );
  }

  banUser(){
    this.userService.deleteUser(this.article.userId)
      .subscribe(data => {
        if(data === 'Deleted'){
          this.author.status = AppConfig.DELETE_STATUS;
        }
      })
  }

  public openDeleteConfirmationDialog() {
    this.confirmationDialogService.confirm('Confirm Deletion', 'Do you really want to delete this article?')
      .then((confirmed) => confirmed && this.deletePost())
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  approvePost(status:number){
    this.articleService.approve(this.article.articleId, status)
      .subscribe(data => {
        this.article.isApproved = data;
      })
  }

  deletePost(){
    this.articleService.delete(this.article.articleId)
      .subscribe(data => {
        if(data === 'Deleted'){
          this.router.navigateByUrl("/admin/post/list");
        }
      })
  }

  static preRenderMarkdown(content: string) {

    return marked(content, {sanitize: true, tables: true}).replace(/<img/g, '<img style="max-width:100%"');
  }


}
