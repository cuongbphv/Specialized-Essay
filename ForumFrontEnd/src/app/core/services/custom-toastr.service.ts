import {Injectable, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from './translate.service';
import {Router} from '@angular/router';


@Injectable()
export class CustomToastrService implements OnInit{

  lang: string = "";

  constructor(
    private toastService: ToastrService,
    private translateService: TranslateService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  showSuccess(message: string ,key: string) {
    this.toastService.success(message, key);
  }

  showSuccessToastr(key: string) {
    this.toastService.success('', this.translateContentToastr(key));
  }

  showErrorToastr(key: string) {
    this.toastService.error('', this.translateContentToastr(key));
  }

  showWarningToastr(key: string) {
    this.toastService.warning('', this.translateContentToastr(key));
  }

  translateContentToastr(key) {
    return key.split('.').reduce((prev, current) => {
      return prev[current];
    }, this.translateService.data);
  }

  routerToast(type: number, body: any){

    //type: 1 comment

    let data = JSON.parse(body.data);

    let mes = data.firstName + " " + data.lastName + " has commented in " +
      data.articleTitle;

    this.toastService.info(mes, 'Notification')
      .onTap.subscribe( toast => {
      this.router.navigateByUrl("/post/" + data.articleId);
    });
  }

}
