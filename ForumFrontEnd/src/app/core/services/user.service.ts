import {Injectable} from '@angular/core';


import {API} from '../../shared/constant';
import {ApiService} from './api.service';
import {AuthService} from 'angular-6-social-login';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {User} from '../models';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {SessionService} from './session.service';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private sessionService: SessionService
  ) {}


  // Verify Token in Cookie with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If Token detected, attempt to get & store user's info
    console.log('polulate');
    if (this.sessionService.getAccessToken()) {
      this.apiService.get(API.USER_DETAIL).pipe(map(res => res))
        .subscribe(data => {
          if(data.status === 200){
            this.setCurrentUser(data.data);
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

  getUser(id: string) : Observable<User>{

    return this.apiService.get(API.GET_USER + id)
      .pipe(map(res => res.data));
  }


  isAdmin(): boolean {
      return this.currentUserSubject.value.role === 'ADMIN';
  }

  isModerator(): boolean {
    return this.currentUserSubject.value.role === 'ADMIN';
  }

}
