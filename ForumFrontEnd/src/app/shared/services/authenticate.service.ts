import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {API} from '../constant/api.constant';
import {Util} from '../util';

@Injectable()
export class AuthService {
  user: Observable<User>;
  userDetails: User = null;

  constructor(private router: Router,
              private http: HttpClient,
              private util: Util) {
    // this.user.subscribe(user => {
    //   if (user) {
    //     this.userDetails = user;
    //   } else {
    //     this.userDetails = null;
    //   }
    // });
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
    return this.http.post<any>(API.USER_LOGIN, {account: username, passwordHash: this.util.MD5Hash(password)})
      .pipe(map(token => {
        console.log(token.data);
        // if (token && token.data) {
          // localStorage.setItem('Access-Token', JSON.stringify(token.data));
          // this.session.setAccessToken(token.data);
        // }
        // return user; // return gloabl user
      }));
  }

  createUserWithEmailAndPassword(emailID: string, password: string) {
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

  signInRegular(email, password) {
  }

  signInWithGoogle() {
  }

  signInWithFacebook() {
  }
}
