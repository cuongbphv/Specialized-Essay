import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthBaseService } from '../services/authenticate.service';

@Injectable()
export class ModeratorGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthBaseService) {}

  canActivate() {
    if (this.authService.isLoggedIn() && this.authService.isModerator()) {
      return true;
    }
    this.router.navigate(['no-access']);
    return false;
  }
}
