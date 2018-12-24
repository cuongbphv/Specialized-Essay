import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {User} from '../../../../core/models';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../core/services';
import {AppConfig} from '../../../../shared/constant';

@Component({
  selector: 'admin-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['../../../../app.component.scss','./detail-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailUserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) { }

  user : User = null;
  userId: string = "";

  ngOnInit() {

    this.userId = this.route.snapshot.params['id'];

    this.getUserDetail(this.userId);

  }


  getUserDetail(id){
    this.userService.getUserDetailById(id)
      .subscribe(data => {
        this.user = data;
      })
  }

  grantAccess(id){
    this.userService.grantAccess(id)
      .subscribe(data => {
        this.user.role = data;
      })
  }

  banUser(id){
    this.userService.deleteUser(id)
      .subscribe(data => {
        if(data === 'Deleted'){
          this.router.navigateByUrl("admin/user");
        }
      })
  }


}
