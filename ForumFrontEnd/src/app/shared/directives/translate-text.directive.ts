import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {TranslateService} from '../../core/services';

@Directive({
  selector: '[textContent]'
})

export class TranslateTextDirective implements OnInit {
  @Input() textContent: any;
  constructor(
    private translateService: TranslateService,
    private el: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onClick($event) {
    if($event.target.id === 'en-lang' || $event.target.id === 'vi-lang'){
      this.setText();
    }
  }

  ngOnInit(): any {
    this.setText();
  }

  setText() {
    this.el.nativeElement.textContent = this.textContent.split(".").reduce((prev, current) => {
      return prev[current]
    }, this.translateService.data);
  }

}
