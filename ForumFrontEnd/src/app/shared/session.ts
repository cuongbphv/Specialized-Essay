import {CookieService} from 'ngx-cookie-service';
import {AppConfig} from './constant/app-config.constant';
import {SharedService} from './shared.service';

export class Session {

  sessionUser: any;

  constructor( private cookieService: CookieService, private sharedService: SharedService) {}


  // Get token from cookie
  getAccessToken() {
    return this.cookieService.get(AppConfig.SESSION_COOKIES);
  }

  // Set token
  setAccessToken(token) {
    if (!!token) {
      this.cookieService.set(AppConfig.SESSION_COOKIES, token);
    }
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
      this.sharedService.setData({currentUser: user});
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
