import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthBaseService } from '../services/auth-base.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthBaseService) {}

  canActivate() {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    }
    this.router.navigate(['no-access']);
    return false;
  }
}