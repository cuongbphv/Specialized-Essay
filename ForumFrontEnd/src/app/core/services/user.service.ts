import {Injectable} from '@angular/core';


import {API, AppConfig} from '../../shared/constant';
import {ApiService} from './api.service';
import {AuthService} from 'angular-6-social-login';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {User} from '../models';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {SessionService} from './session.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class UserService {

  //attempt redirect after CanActive
  redirectUrl: string;

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private sessionService: SessionService,
    private router: Router,
    private loading: NgxSpinnerService
  ) {}


  // Verify Token in Cookie with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If Token detected, attempt to get & store user's info
    console.log('polulate');
    if (this.sessionService.getAccessToken()) {
      this.loading.show();
      this.apiService.get(API.USER_DETAIL).pipe(map(res => res))
        .subscribe(data => {
          if(data.status === 200){
            this.setCurrentUser(data.data);
            this.loading.hide();
            if(this.redirectUrl) {
              this.router.navigate([this.redirectUrl]);
            }
          }
          else{
            this.purgeUser();
            this.loading.hide();
          }
        });
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeUser();
    }
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  purgeUser() {
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    //navigate to login
    if (this.redirectUrl) {
      this.router.navigate(['login'], {
        queryParams: {returnUrl: this.redirectUrl}
      });
    }
  }

  // // Update the user on the server (email, pass, etc)
  // update(user): Observable<User> {
  //   return this.apiService
  //     .put('/user', { user })
  //     .pipe(map(data => {
  //       // Update the currentUser observable
  //       this.currentUserSubject.next(data.user);
  //       return data.user;
  //     }));
  // }

  isAdmin(): boolean {
      return this.currentUserSubject.value.role <= AppConfig.ROLE_ADMIN;
  }

  isModerator(): boolean {
    return this.currentUserSubject.value.role <= AppConfig.ROLE_MODERATOR;
  }

  isUser(): boolean {
    return this.currentUserSubject.value.role <= AppConfig.ROLE_USER;
  }

  getUser(id: string) : Observable<User>{
    return this.apiService.get(API.GET_USER + id)
      .pipe(map(res => res.data));
  }

  deleteUser(id: string): Observable<string>{
    return this.apiService.delete(API.GET_USER + id)
      .pipe(map(res => res.data));
  }

  getUserDetailById(id: string): Observable<User>{
    return this.apiService.get(API.USER_DETAIL + "/" +id)
      .pipe(map(res => res.data));
  }

  getListUser(pagingModel: Object): Observable<any>{
    return this.apiService.post(API.LIST_USER, pagingModel)
      .pipe(map(res => res.data));
  }

  getListBannedUser(pagingModel: Object): Observable<any>{
    return this.apiService.post(API.LIST_BANNED_USER, pagingModel)
      .pipe(map(res => res.data));
  }

  grantAccess(id: string): Observable<number>{
    return this.apiService.get(API.GRANT_USER_ACCESS + id)
      .pipe(map(res => res.data));
  }
}
