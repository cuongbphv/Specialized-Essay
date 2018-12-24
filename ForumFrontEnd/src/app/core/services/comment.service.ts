import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import { Comment } from '../models';
import { CustomToastrService } from './custom-toastr.service';

@Injectable()
export class CommentService {

  constructor(
    private apiService: ApiService,
    private toastrService: CustomToastrService
  ) {
  }

  addComment(comment: Comment): Observable<any> {
    return this.apiService.post(API.CRUD_COMMENT, comment).pipe(map(
      res => {
        if(res.status === 200){
          console.log(res.data);
          // this.toastrService.showSuccessToastr('message.comment.add_success');
          return res.data;
        }
        return null;
      }
    ));
  }

  updateComment(commentId: string, content: string): Observable<any> {
    return this.apiService.put(API.CRUD_COMMENT, {
      commentId: commentId,
      content: content
    }).pipe(map(
      res => {
        if(res.status === 200){
          this.toastrService.showSuccessToastr('message.comment.update_success');
          return res.data;
        }
        this.toastrService.showSuccessToastr('api.status.' + res.status);
        return null;
      }
    ));
  }

  deleteComment(commentId: string): Observable<any> {
    return this.apiService.delete(API.CRUD_COMMENT + "?comment_id=" + commentId).pipe(map(
      res => {
        if(res.status === 200){
          console.log(res.data);
          this.toastrService.showSuccessToastr('message.comment.delete_success');
          return res.data;
        }
        this.toastrService.showSuccessToastr('api.status.' + res.status);
        return null;
      }
    ));
  }

  getListComment(articleId: string, pageNumber: number, pageSize: number) {
    return this.apiService.post(API.LIST_COMMENT_IN_ARTICLE, {
      searchKey: articleId,
      pageNumber: pageNumber,
      pageSize: pageSize
    }).pipe(map(
      res => {
        if(res.status === 200){
          // this.toastrService.showSuccessToastr('message.comment.add_success');
          return res.data;
        }
        return null;
      }
    ));
  }

  interactToComment(commentId: string, userId: string, rating: number): Observable<any> {
    return this.apiService.post(API.COMMENT_INTERACT, {
      commentId: commentId,
      userId: userId,
      rating: rating
    }).pipe(map(
      res => {
        if(res.status === 200){
          return res.data;
        }
        return null;
      }
    ));
  }

  getListInteract(commentId: string): Observable<any> {
    return this.apiService.get(API.COMMENT_INTERACT + "?comment_id=" + commentId).pipe(map(
      res => {
        if(res.status === 200){
          return res.data;
        }
        return null;
      }
    ));
  }

}
