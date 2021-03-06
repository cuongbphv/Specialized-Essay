import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {CustomToastrService} from './custom-toastr.service';

@Injectable()
export class TagService {

  constructor(
    private apiService: ApiService,
    private toastrService: CustomToastrService
  ) {
  }

  getMostTagInForum(): Observable<any> {
    return this.apiService.get(API.GET_MOST_TAG_IN_FORUM)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getMyTags(userId: string): Observable<any> {
    return this.apiService.get(API.MY_TAGS + "?user_id=" + userId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getTagInfomation(tagId: string): Observable<any> {
    return this.apiService.get(API.TAG_INFORMATION + tagId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getTagInfo(tagId: string): Observable<any> {
    return this.apiService.post(API.TAG_INFORMATION + tagId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getTagByUserId(userId: string): Observable<any> {
    return this.apiService.get(API.TAG_BY_USER_ID + userId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }


  getFollowStatus(userId: string, tagId: any): Observable<any> {
    return this.apiService.get(API.FOLLOW_STATUS + "?tag_id=" + tagId + "&user_id=" + userId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  followTag(userId: string, tagId: any): Observable<any> {
    return this.apiService.post(API.FOLLOW_TAG, {
      userId: userId,
      tagId: tagId
    })
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  unfollowTag(userId: string, tagId: any): Observable<any> {
    return this.apiService.post(API.UNFOLLOW_TAG,{
      userId: userId,
      tagId: tagId
    })
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getListFollowers(pagingRequest: any): Observable<any> {
    return this.apiService.post(API.LIST_TAG_FOLLOWERS, {
      type: pagingRequest.type,
      searchKey: pagingRequest.searchKey,
      sortCase: pagingRequest.sortCase,
      ascSort: pagingRequest.ascSort,
      pageNumber: pagingRequest.pageNumber,
      pageSize: pagingRequest.pageSize
    })
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getArticleByTypeAndTagId(pagingRequest: any): Observable<any> {
    return this.apiService.post(API.LIST_ARTICLE_BY_TYPE_AND_TAG_ID, {
      type: pagingRequest.type,
      searchKey: pagingRequest.searchKey,
      sortCase: pagingRequest.sortCase,
      ascSort: pagingRequest.ascSort,
      pageNumber: pagingRequest.pageNumber,
      pageSize: pagingRequest.pageSize
    })
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getListTagPaging(pagingRequest: Object): Observable<any>{
    return this.apiService.post(API.LIST_TAG_DETAIL, pagingRequest)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getListBannedTagPaging(pagingRequest: Object): Observable<any>{
    return this.apiService.post(API.LIST_BANNED_TAG, pagingRequest)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  deleteTag(tagId: string): Observable<any>{
    return this.apiService.delete(API.TAG_INFORMATION + tagId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  updateTag(tag: Object): Observable<any>{
    return this.apiService.put(API.TAG_URL, tag)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getAllTags(pagingRequest: any): Observable<any> {
    return this.apiService.post(API.ALL_TAGS, {
      type: pagingRequest.type,
      userId: pagingRequest.userId,
      searchKey: pagingRequest.searchKey,
      sortCase: pagingRequest.sortCase,
      ascSort: pagingRequest.ascSort,
      pageNumber: pagingRequest.pageNumber,
      pageSize: pagingRequest.pageSize
    })
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        this.toastrService.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

}
