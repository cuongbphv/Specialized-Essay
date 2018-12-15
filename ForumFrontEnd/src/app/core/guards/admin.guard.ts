import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {UserService} from '../services';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate() {
    if (this.userService.isAdmin()) {
      return true;
    }
    this.router.navigate(['no-access']);
    return false;
  }
}
