import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TranslateTextDirective, TranslatePlaceholderDirective } from './directives';
import { TranslatePipe } from './pipes';
import { AdminGuard, ModeratorGuard, UserGuard } from '../core/guards';
import {SessionService, DataService, AuthBaseService, UserService} from '../core/services';
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
    ShowAuthedDirective
  ],
  exports: [
    FormsModule,
    RouterModule,
    TranslatePipe,
    ShowAuthedDirective,
    TranslateTextDirective,
    TranslatePlaceholderDirective
  ]
})

export class SharedModule {}
