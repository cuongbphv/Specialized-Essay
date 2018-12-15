import {Component, OnInit} from '@angular/core';

import {TranslateService, UserService} from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public translate: TranslateService,
              private userService : UserService) {}

  ngOnInit(): void {
    this.userService.populate();
  }

}
