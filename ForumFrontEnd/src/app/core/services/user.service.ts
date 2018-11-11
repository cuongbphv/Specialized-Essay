import {Injectable} from '@angular/core';


import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {AuthService} from 'angular-6-social-login';
import {map} from 'rxjs/operators';
import {User} from '../models';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    private apiService: ApiService,
  ) {}

  getUser(id: string) : Observable<User>{

    return this.apiService.get(API.GET_USER + id)
      .pipe(map(res => res.data));
  }

}
