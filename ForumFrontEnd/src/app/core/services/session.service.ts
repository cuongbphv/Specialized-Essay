import {CookieService} from 'ngx-cookie-service';
import {AppConfig} from '../../shared/constant';
import {DataService} from './data.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SessionService {

  sessionUser: any;

  constructor( private cookieService: CookieService, private sharedService: DataService) {}

  // Get token from cookie
  getAccessToken() {
    return this.cookieService.get(AppConfig.SESSION_COOKIES);
  }

  // Set token
  setAccessToken(token) {
    if (token !== null) {
      this.cookieService.set(AppConfig.SESSION_COOKIES, token, AppConfig.TOKEN_EXPIRE_DATE);
    }
  }

  // Destroy Access Token
  destroyAccessToken(){
    this.cookieService.delete(AppConfig.SESSION_COOKIES);
  }

  // get User
  getUser() {
    return this.sessionUser;
  }

  // Set user
  setUser(user) {
    // Set user
    if (user != null && typeof user === 'object') {
        this.sessionUser = user;
    }
  }

  detectBrowserLang() {
    // Language code: http://4umi.com/web/html/languagecodes.php || http://msdn.microsoft.com/en-us/library/ie/ms533052.aspx
    let lang = window.navigator.language;
    let language = lang.substr(0, 2);
    switch (language) {
      case 'en':
      case 'vi':
        return language;
      default:
        return 'en';
    }
  }
}
