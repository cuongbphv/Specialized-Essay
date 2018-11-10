import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API} from '../../../shared/constant/api.constant';
import {AuthBaseService} from '../../../shared/services/authenticate.service';
import {Util} from '../../../shared/util';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class RegisterService {

  constructor(
    private authBaseService: AuthBaseService,
    private http: HttpClient,
    private util: Util
  ) {}

  createUser(user: any) {
    return this.http.post<any>(API.REGISTER_USER, {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.username,
      email: user.email,
      passwordHash: this.util.MD5Hash(user.password)
    }, httpOptions).pipe(map(res => res.data));
  }
}
