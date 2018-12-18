import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

import {SharedModule, FooterComponent, HeaderComponent} from './shared';
import { HomeModule } from './modules/home/home.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core';

import { TranslateService } from './core/services';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login';
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
    AuthModule,
    HomeModule,
    CoreModule,
    SocialLoginModule,
    UserModule,
    AppRoutingModule,
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
    HeaderComponent
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
