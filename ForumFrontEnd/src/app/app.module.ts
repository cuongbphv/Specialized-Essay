import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core';

import { TranslateService } from './core/services';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login';
import { AdminLayoutComponent } from './_layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './_layout/user-layout/user-layout.component';
import {AdminNavbarComponent} from './_layout/admin-navbar/navbar.component';
import {AdminFooterComponent} from './_layout/admin-footer/footer.component';
import {AdminSidebarComponent} from './_layout/admin-sidebar/sidebar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AdminModule} from './modules/admin/admin.module';
import {ErrorModule} from './modules/error/error.module';
import {SharedModule} from './shared';
import {FooterComponent} from './_layout/user-footer';
import {HeaderComponent} from './_layout/user-header';
import {UserModule} from './modules/user/user.module';


// Configs
export function getAuthServiceConfigs() {

  const googleLoginOptions: any = {
    scope: 'profile'
  };

  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("377313722811067")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("54163204787-0gq614b39l1pjvqikgtuubtrpgbaha54.apps.googleusercontent.com")
      },
    ]
  );
  return config;
}

/* to load and set en.json as the default application language */
export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('en');
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    ErrorModule,
    CoreModule,
    SocialLoginModule,
    UserModule,
    AdminModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      autoDismiss: true,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false
    }) // ToastrModule added
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    AdminLayoutComponent,
    UserLayoutComponent
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
