import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../models';

import {API} from '../../shared/constant';
import {SecurityService} from './security.service';
import {ApiService} from './api.service';
import {FacebookLoginProvider, GoogleLoginProvider, AuthService} from 'angular-6-social-login';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class AuthBaseService {
  user: Observable<User>;
  userDetails: User = null;

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  constructor(
    private security: SecurityService,
    private apiService: ApiService,
    private socialAuthService: AuthService
  ) {}

  register(user: any): Observable<any> {
    return this.apiService.post(API.REGISTER_USER, {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.username,
      email: user.email,
      passwordHash: this.security.MD5Hash(user.password)
    }).pipe(map(res => res));
  }

  isLoggedIn() {
    if (this.userDetails === null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
  }

  login(username: string, password: string) {
    return this.apiService.post(API.USER_LOGIN, {
      account: username,
      passwordHash: this.security.MD5Hash(password)
    }).pipe(map(response => {
        console.log(response.data);
        // if (token && token.data) {
          // localStorage.setItem('Access-Token', JSON.stringify(token.data));
          // this.session.setAccessToken(token.data);
        // }
        // return user; // return gloabl user
      }));
  }

  getLoggedInUser(): Observable<User> {
    return this.user;
  }

  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    user.subscribe(loginUser => {
      if (loginUser != null && loginUser.role === 'admin') {
        return true;
      }
    });
    return false;
  }

  isModerator(): boolean {
    const user = this.getLoggedInUser();
    user.subscribe(loginUser => {
      if (loginUser != null && loginUser.role === 'moderator') {
        return true;
      }
    });
    return false;
  }

  rememberMe(email, password) {
  }

  socialSignIn(socialPlatform: string): Promise<any> {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    return this.socialAuthService.signIn(socialPlatformProvider);
  }

  checkExistedEmail(email: string): Observable<any> {

    let params = new HttpParams().set('email', email);

    return this.apiService.get(API.AUTH_USER_EMAIL, params)
      .pipe(map(res => res));
  }

}
