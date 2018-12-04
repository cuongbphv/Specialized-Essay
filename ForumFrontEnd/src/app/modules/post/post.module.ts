// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { PostRoutingModule } from './post.routing';

import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde'

// Components
import { CreatePostComponent } from './create/create-post.component';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG
    })
  ],
  declarations: [
    CreatePostComponent
  ],
  providers: []
})
export class PostModule {}


