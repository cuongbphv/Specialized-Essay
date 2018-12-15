import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import {UserService} from '../services';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private router: Router,private userService: UserService) {}

  canActivate(route, state: RouterStateSnapshot) {
    if (this.userService.getCurrentUser() != null) {
      return true;
    }
    this.router.navigate(['login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
