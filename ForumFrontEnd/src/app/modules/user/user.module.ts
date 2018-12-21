import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared';
import {ProfileModule} from './profile/profile.module';
import {PostModule} from './post/post.module';
import {HomeModule} from './home/home.module';
import {AuthModule} from './auth/auth.module';
import {UserRoutingModule} from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    ProfileModule,
    PostModule,
    HomeModule,
    AuthModule
  ],
  declarations: [
  ]
})
export class UserModule { }
