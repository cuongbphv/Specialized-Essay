import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {TranslateService} from '../../core/services';

@Directive({
  selector: '[textPlaceHolder]'
})

export class TranslatePlaceholderDirective implements OnInit {
  @Input() textPlaceHolder: any;
  constructor(
    private translateService: TranslateService,
    private el: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onClick($event) {
    if($event.target.id === 'en-lang' || $event.target.id === 'vi-lang'){
      this.setTextPlaceHolder();
    }
  }

  ngOnInit(): any {
    this.setTextPlaceHolder();
  }

  setTextPlaceHolder() {
    this.el.nativeElement.placeholder = this.textPlaceHolder.split(".").reduce((prev, current) => {
      return prev[current]
    }, this.translateService.data);
  }

}
