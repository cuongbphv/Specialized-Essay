import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  TranslateTextDirective,
  TranslatePlaceholderDirective,
  ModalComponent
} from './directives';
import {SafeHtmlPipe, TranslatePipe} from './pipes';
import {ShowAuthedDirective} from './directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    TranslatePipe,
    TranslateTextDirective,
    TranslatePlaceholderDirective,
    ShowAuthedDirective,
    SafeHtmlPipe,
    ModalComponent
  ],
  exports: [
    FormsModule,
    RouterModule,
    TranslatePipe,
    ShowAuthedDirective,
    TranslateTextDirective,
    TranslatePlaceholderDirective,
    SafeHtmlPipe,
    ModalComponent
  ]
})

export class SharedModule {}
