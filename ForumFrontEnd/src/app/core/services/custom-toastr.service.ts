import {Injectable, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from './translate.service';


@Injectable()
export class CustomToastrService implements OnInit{

  lang: string = "";

  constructor(
    private toastService: ToastrService,
    private translateService: TranslateService
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

}
