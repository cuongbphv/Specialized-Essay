import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private session: SessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let contentType;
    let headersConfig;

    if (req.headers.has('Content-Type')) {
      contentType = req.headers.get('Content-Type');
    }

     headersConfig = {
      'Accept': 'application/json'
    };

    const token = this.session.getAccessToken();

    if (token) {
      headersConfig['X-Access-Token'] = `${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
