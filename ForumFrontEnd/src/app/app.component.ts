import {Component, OnInit} from '@angular/core';

import {CustomToastrService, TranslateService, UserService} from './core/services';

import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private serverUrl = 'http://localhost:8080/socket';
  private stompClient;
  private subUrl='/notification/greetings';
  private sendUrl='/app/send';

  constructor(public translate: TranslateService,
              private userService : UserService,
              private toastr: CustomToastrService,
              private router: Router) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
    this.userService.populate();
  }

  initializeWebSocketConnection() {

    this.userService.currentUser.subscribe(userData => {

      let ws = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(ws);
      let that = this;
      this.stompClient.connect({}, function () {
        that.stompClient.subscribe("/notification/"+ userData.userId, (message) => {

          if (message.body) {
            let body = JSON.parse(message.body);
            console.log('message body', JSON.parse(message.body));
            that.toastr.routerToast(1, body);
          }
      });
      });

    })

  };

  sendMessage() {

  }


}
