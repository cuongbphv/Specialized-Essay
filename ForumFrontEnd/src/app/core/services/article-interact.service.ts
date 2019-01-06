import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';

@Injectable()
export class ArticleInteractService {

  constructor(
    private apiService: ApiService
  ) {
  }

  interact(myInteract: any): Observable<any> {
    return this.apiService.post(API.ADD_INTERACT, {
      articleId: myInteract.articleId,
      userId: myInteract.userId,
      rating: myInteract.rating,
      bookmark: myInteract.bookmark,
      share: myInteract.share
    }).pipe(map(res => res));
  }

  getListArticleInteract(articleId: string): Observable<any> {
    return this.apiService.get(API.GET_LIST_ARTICLE_INTERACT + "?article_id=" + articleId)
      .pipe(map(res => res.data));
  }

}
