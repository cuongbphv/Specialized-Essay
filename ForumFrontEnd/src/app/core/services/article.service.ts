import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {User} from '../models';

@Injectable()
export class ArticleService {

  constructor(
    private apiService: ApiService
  ) {
  }

  createPost(post: any): Observable<any> {

    return this.apiService.post(API.CREATE_ARTICLE, {
      title: post.title,
      content: post.content,
      type: post.type,
      userId: post.userId,
      tags: post.tags
    }).pipe(map(res => res));
  }

  getDetailPost(id: string): Observable<any> {
    return this.apiService.get(API.GET_ARTICLE + id)
      .pipe(map(res => res.data));
  }

}
