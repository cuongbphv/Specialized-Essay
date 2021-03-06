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
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthBaseService {
  user: Observable<User>;

  constructor(
    private security: SecurityService,
    private apiService: ApiService,
    private socialAuthService: AuthService,
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router
  ) {
  }

  register(user: any, followTagId: any, authorId: any): Observable<any> {

      let userRequest = {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.emailAddress,
        passwordHash: this.security.MD5Hash(user.password),
        userId: user.userId || null,
        phone: user.phone || null,
        avatarUrl: user.image || null,
        lang: user.lang || null,
        description: user.description || null,
        setting: user.setting || null,
        tagIds: followTagId || null,
        authorIds: authorId || null
      };

      const formdata: FormData = new FormData();

      formdata.append('avatarImg', user.imgFile);
      formdata.append('userRequest', new Blob([JSON.stringify(userRequest)],
        {type: 'application/json'}));

      return this.apiService.formData(API.REGISTER_USER, formdata)
        .pipe(map(res => res));
   // }
   //  else{
   //
   //    return this.apiService.post(API.REGISTER_USER, {
   //      firstName: user.firstName,
   //      lastName: user.lastName,
   //      userName: user.userName,
   //      email: user.emailAddress,
   //      passwordHash: this.security.MD5Hash(user.password),
   //      userId: user.userId || null,
   //      phone: user.phone || null,
   //      avatarUrl: user.image || null,
   //      lang: user.lang || null,
   //      description: user.description || null,
   //      setting: user.setting || null
   //    }).pipe(map(res => res));

  //  }
  }

  logout() {
    this.userService.purgeUser();
    this.sessionService.destroyAccessToken();
    this.router.navigateByUrl('/login');
  }

  socialLogin(username: string, token: string, provider: string, url:string){
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
          this.router.navigate([url]);
        }
      });
  }

  login(username: string, password: string, url:string) {
    this.apiService.post(API.USER_LOGIN, {
      account: username,
      passwordHash: this.security.MD5Hash(password)
    }).pipe(map(res => res))
      .subscribe(data => {
        if (data.status === 200) {
          // set token for login session
          this.sessionService.setAccessToken(data.data);
          this.userService.populate();
          this.router.navigate([url]);
        }
      });
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

  test(avatar: File){

    const formdata: FormData = new FormData();
    formdata.append('avatar', avatar);
    formdata.append('content', "Content value");

    this.apiService.formData("/admin/test", formdata)
      .pipe(map(res=>res.data))
      .subscribe(data => console.log("hihi", data));
  }
}
