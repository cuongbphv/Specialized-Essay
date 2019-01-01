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

  routerToast(title: string, message: string, data: any){

    let mes = "There is new comment in your following post ";

    this.toastService.info('Notification', 'asdasd12312')
      .onTap.subscribe( toast => {
      this.router.navigateByUrl("/");
    });
  }

}
