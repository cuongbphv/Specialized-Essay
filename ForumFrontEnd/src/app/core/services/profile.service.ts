import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Profile} from '../models/profile.model';
import {map} from 'rxjs/operators';
import {API} from '../../shared/constant';
import {ToastrService} from 'ngx-toastr';


@Injectable()
export class ProfilesService {
  constructor (
    private apiService: ApiService,
    private toastr: ToastrService
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
    return this.apiService.put(API.UPDATE_PROFILE, profile)
      .pipe(map(res => {

        if(res.status === 200){
          return res.data;
        }
        return null;
      }));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + username + '/follow');
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + username + '/follow');
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

}
