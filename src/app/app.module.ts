import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RegisterPage0 }from './register/components/recruiterPage0/RegisterPage0.component';
import { RegisterPage1 }from './register/components/recruiterPage1/RegisterPage1.component';
import { RegisterPage2 }from './register/components/recruiterPage2/RegisterPage2.component';
import { RegisterPage3 }from './register/components/recruiterPage3/RegisterPage3.component';
import { AppComponent } from './app.component';
import { RegisterFooter } from './register/components/globalComponents/footer/footer.component'
import { ProgressBar } from './register/components/globalComponents/progressBar/progressBar.component'
import { RouterModule } from '@angular/router';
import { routes } from './app.routing.module'
import { RegisterModelService } from './services/model.service'
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
 


// import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
// import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
 
 
const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('380914575563-o5mslfbj2klk7tdhdmr2rdogk9ugq86d.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  },
  {
    id: LinkedinLoginProvider.PROVIDER_ID,
    provider: new LinkedinLoginProvider('LINKEDIN_CLIENT_ID')
  }
],false);
 
 
export function provideConfig() {
  return CONFIG;
}
@NgModule({
  declarations: [
    AppComponent,

    //register pages 
    RegisterPage0,
    RegisterPage1,
    RegisterPage2,
    RegisterPage3,

    //register global 
    RegisterFooter,
    ProgressBar
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
  },{
      provide:RegisterModelService, 
      useClass:RegisterModelService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
