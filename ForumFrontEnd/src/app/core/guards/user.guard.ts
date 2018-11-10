import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthBaseService } from '../services';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthBaseService) {}

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
