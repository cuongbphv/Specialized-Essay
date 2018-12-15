import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../models';

import {API} from '../../shared/constant';
import {SecurityService} from './security.service';
import {ApiService} from './api.service';
import {FacebookLoginProvider, GoogleLoginProvider, AuthService} from 'angular-6-social-login';
import {HttpParams} from '@angular/common/http';
import {SessionService} from './session.service';
import {rootRoute} from '@angular/router/src/router_module';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthBaseService {
  user: Observable<User>;
  userDetails: User = null;

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  constructor(
    private security: SecurityService,
    private apiService: ApiService,
    private socialAuthService: AuthService,
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router
  ) {
  }

  register(user: any): Observable<any> {

    return this.apiService.post(API.REGISTER_USER, {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.emailAddress,
      passwordHash: this.security.MD5Hash(user.password),
      userId: user.userId || null,
      phone: user.phone || null,
      lang: user.lang || null,
      setting: user.setting || null
    }).pipe(map(res => res));
  }

  isLoggedIn(){
    return this.user !== null;
  }

  logout() {
    this.userService.purgeUser();
    this.sessionService.destroyAccessToken();
    this.router.navigate(["login"]);
  }

  socialLogin(username: string, token: string, provider: string){
    return this.apiService.post(API.USER_SOCIAL_LOGIN, {
      account: username,
      token: token,
      provider: provider
    }).pipe(map(res => res))
      .subscribe(data => {
        if (data.status === 200) {
          // set token for login session
          this.sessionService.setAccessToken(data.data);
          this.userService.populate();
        }
      });
  }

  login(username: string, password: string) {
    this.apiService.post(API.USER_LOGIN, {
      account: username,
      passwordHash: this.security.MD5Hash(password)
    }).pipe(map(res => res))
      .subscribe(data => {
        if (data.status === 200) {
          // set token for login session
          this.sessionService.setAccessToken(data.data);
          this.userService.populate();
        }
      });
  }

  getLoggedInUser(): Observable<User> {

    this.apiService.get(API.USER_DETAIL).pipe(map(res => {
      this.user = res.data;
    }));

    return this.user;
  }

  isAdmin(): boolean {
    let user = this.getLoggedInUser();
    user.subscribe(loginUser => {
      if (loginUser != null && loginUser.role === 'admin') {
        return true;
      }
    });
    return false;
  }

  isModerator(): boolean {
    let user = this.getLoggedInUser();
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
