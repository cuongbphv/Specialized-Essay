import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {CustomToastrService} from './custom-toastr.service';

@Injectable()
export class ArticleService {

  constructor(
    private apiService: ApiService,
    private toastrService: CustomToastrService
  ) {
  }

  createPost(post: any): Observable<any> {

    return this.apiService.post(API.CREATE_ARTICLE, {
      title: post.title,
      content: post.content,
      type: post.type,
      userId: post.userId,
      tags: post.tags
    }).pipe(map(res => {
      if(res.status === 200){
        return res.data;
      }
      return null;
    }));
  }

  updatePost(post: any): Observable<any> {

    return this.apiService.put(API.UPDATE_ARTICLE, {
      articleId: post.articleId,
      title: post.title,
      content: post.content,
      type: post.type,
      userId: post.userId,
      tags: post.tags
    }).pipe(map(res => {
      if(res.status === 200){
        return res.data;
      }
      return null;
    }));
  }

  getDetailPost(id: string): Observable<any> {
    return this.apiService.get(API.GET_ARTICLE + id)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        return null;
      }));
  }

  getListArticle(pagingRequest: any): Observable<any> {
    return this.apiService.post(API.GET_LIST_ARTICLE, {
      type: pagingRequest.type,
      searchKey: pagingRequest.searchKey,
      sortCase: pagingRequest.sortCase,
      ascSort: pagingRequest.ascSort,
      pageNumber: pagingRequest.pageNumber,
      pageSize: pagingRequest.pageSize
    }).pipe(map(res => res.data));
  }

  viewCount(articleId: string): Observable<any> {
    return this.apiService.get(API.VIEW_COUNT + "?article_id=" + articleId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        return null;
      }));
  }

  markAsResolved(articleId: string, rightAnswerId): Observable<any> {
    return this.apiService.put(API.MARK_AS_RESOLVED, {
      articleId: articleId,
      rightAnswerId: rightAnswerId
    })
      .pipe(map(res => {
        if(res.status === 200){
          this.toastrService.showSuccessToastr('message.resolved.success');
          return res.data;
        }
        return null;
      }));
  }

  statByArticle(articleId: string): Observable<any> {
    return this.apiService.get(API.STATS_BY_ARTICLE + "?article_id=" + articleId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        return null;
      }));
  }

  getRelatedArticle(tagIds: any, type: string): Observable<any> {
    return this.apiService.post(API.GET_RELATED_ARTICLE, {
      tags: tagIds,
      type: type
    })
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        return null;
      }));
  }

  getArticleSameAuthor(userId: string, type: string): Observable<any> {
    return this.apiService.post(API.ARTICLE_SAME_AUTHOR, {
      userId: userId,
      type: type
    })
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        return null;
      }));
  }

  getBookmarkList(userId: string, type: number): Observable<any> {
    return this.apiService.get(API.BOOKMARK_LIST + "?user_id=" + userId + "&type=" + type)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        return null;
      }));
  }

}
