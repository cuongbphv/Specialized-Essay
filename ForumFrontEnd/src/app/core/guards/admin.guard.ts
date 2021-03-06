import { Injectable } from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../services';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService
  ) {}

  canActivate(route, state: RouterStateSnapshot) {

    if (this.userService.isAdmin()) {
      return true;
    }

    this.userService.redirectUrl = state.url;

    if(this.userService.isAuthenticated.subscribe(isAuthen => {
      if(isAuthen){
        this.router.navigate(['no-access']);
      }
    }))

    return false;
  }
}
