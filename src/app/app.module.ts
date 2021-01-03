import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieLawModule } from 'angular2-cookie-law';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SocialLoginModule, 
  AuthServiceConfig,
  GoogleLoginProvider, 
  FacebookLoginProvider, 
  LinkedinLoginProvider
} from 'ng4-social-login';
import { WelcomePage } from './non_secure_pages/welcomePage/welcomePage.component';
import { Register } from './non_secure_pages/register/register.component';
import { Header } from './components/header/header.component';


// import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
// import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
 
 
const CONFIG = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  }
],false);
 
 
export function provideConfig() {
  return CONFIG;
}
@NgModule({
  declarations: [
    AppComponent,

   
    //NON Secure
    WelcomePage,
    Register,
   

    Header
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    CookieLawModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
