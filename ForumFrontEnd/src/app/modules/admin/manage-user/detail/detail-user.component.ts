import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {User} from '../../../../core/models';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../core/services';
import {AppConfig} from '../../../../shared/constant';
import {ConfirmationDialogService} from '../../confirmation-dialog/confirmation-dialog.service';

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
    private confirmationDialogService: ConfirmationDialogService
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
        console.log('user', data);
      })
  }

  grantAccess(id){
    this.userService.grantAccess(id)
      .subscribe(data => {
        this.user.role = data;
      })
  }

  public openDeleteConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm', 'Do you really want to ban this user?')
      .then((confirmed) => confirmed && this.banUser(this.user.userId))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  banUser(id){
    this.userService.deleteUser(id)
      .subscribe(data => {
        if(data === 'Deleted'){
          this.router.navigateByUrl("admin/user/list");
        }
      })
  }


}
