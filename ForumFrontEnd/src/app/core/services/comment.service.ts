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
    return this.apiService.post(API.ADD_COMMENT, comment).pipe(map(
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

}
