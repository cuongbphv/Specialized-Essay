import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Profile} from '../models/profile.model';
import {map} from 'rxjs/operators';
import {API} from '../../shared/constant';
import {ToastrService} from 'ngx-toastr';
import {CustomToastrService} from './custom-toastr.service';


@Injectable()
export class ProfilesService {
  constructor (
    private apiService: ApiService,
    private toastr: CustomToastrService
  ) {}

  get(userId: string): Observable<Profile> {
    return this.apiService.get(API.GET_PROFILE + userId)
      .pipe(map(res => {

        if(res.status === 200){
          return res.data;
        }
        return null;
      }));
  }

  update(profile: Profile): Observable<Profile>{


    let profileRequest = {
      userId: profile.userId,
      userProfileId: profile.userProfileId,
      lastName: profile.lastName,
      firstName: profile.firstName,
      avatar: profile.avatar,
      company: profile.company,
      position: profile.position,
      description: profile.description,
      githubLink: profile.githubLink,
      websiteLink: profile.websiteLink
    };

    const formdata: FormData = new FormData();

    formdata.append('avatarImg', profile.avatarImg);
    formdata.append('profileRequest', new Blob([JSON.stringify(profileRequest)],
      {type: 'application/json'}));

    return this.apiService.putFormData(API.UPDATE_PROFILE, formdata)
      .pipe(map(res => {

        if(res.status === 200){
          return res.data;
        }
        return null;
      }));

    // return this.apiService.put(API.UPDATE_PROFILE, profile)
    //   .pipe(map(res => {
    //
    //     if(res.status === 200){
    //       return res.data;
    //     }
    //     return null;
    //   }));
  }

  getFollow(userId: string): Observable<any> {
    return this.apiService.get(API.FOLLOW_USER + userId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }

        this.toastr.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  follow(userId: string): Observable<any> {
    return this.apiService.post(API.FOLLOW_USER + userId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }

        this.toastr.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  unfollow(userId: string): Observable<any> {
    return this.apiService.delete(API.FOLLOW_USER + userId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }

        this.toastr.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getListFollowUser(userId: string): Observable<any> {
    return this.apiService.post(API.LIST_FOLLOW_USER + userId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }

        this.toastr.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getListFollowByOther(userId: string): Observable<any> {
    return this.apiService.post(API.LIST_FOLLOW_BY_OTHER + userId)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }

        this.toastr.showErrorToastr("api.status." + res.status);
        return null;
      }));
  }

  getTopAuthor(): Observable<any> {
    return this.apiService.get(API.TOP_AUTHOR)
      .pipe(map(res => {
        if(res.status === 200){
          return res.data;
        }
        return null;
      }));
  }

  getUserArticle(pagingRequest: any): Observable<any> {
    return this.apiService.post(API.MY_ARTICLE, {
      type: pagingRequest.type,
      userId: pagingRequest.userId,
      sortCase: pagingRequest.sortCase,
      ascSort: pagingRequest.ascSort,
      pageNumber: pagingRequest.pageNumber,
      pageSize: pagingRequest.pageSize
    }).pipe(map(res => {
      if(res.status === 200){
        return res.data;
      }
      return null;
    }));
  }

  getUserComment(pagingRequest: any): Observable<any> {
    return this.apiService.post(API.MY_COMMENT, {
      type: pagingRequest.type,
      userId: pagingRequest.userId,
      sortCase: pagingRequest.sortCase,
      ascSort: pagingRequest.ascSort,
      pageNumber: pagingRequest.pageNumber,
      pageSize: pagingRequest.pageSize
    }).pipe(map(res => {
      if(res.status === 200){
        return res.data;
      }
      return null;
    }));
  }

}
