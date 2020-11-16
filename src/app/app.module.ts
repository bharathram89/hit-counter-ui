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
import { SignOn } from './non_secure/signOn/SignOn.component';
import {
  SocialLoginModule, 
  AuthServiceConfig,
  GoogleLoginProvider, 
  FacebookLoginProvider, 
  LinkedinLoginProvider
} from 'ng4-social-login';
import { AcntVerified } from './non_secure/acntVerified/acntVerified.component';
import { ResendVerificationEmail } from './non_secure/resendVerificationEmail/resendVerificationEmail.component';
import { ForgotPass } from './non_secure/forgotPass/forgotPass.component';
import { ResetPass } from './non_secure/resetPass/resetPass.component';
import { Profile } from './secure/profile/profile.component';
import { SecureFooter } from './secure/global/secureFooter/secureFooter.component';
import { SecureLeftNav } from './secure/global/secureLeftNav/secureLeftNav.component';
import { SecureHeader } from './secure/global/secureHeader/secureHeader.component';
import { UserObjService } from './services/userObj.service';
import { PostAJob } from './secure/postAJob/postAJob.component';

import { PostAJobPage1 } from './secure/postAJob/components/page1/page1.component';
import { PostAJobPage0 } from './secure/postAJob/components/page0/page0.component';
import { PostAJobObjService } from './services/postAJob.service';
import { AddProfileInfo } from './secure/addProfileInfo/addProfileInfo.component';

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
    ProgressBar,

    //NON Secure
    SignOn,
    AcntVerified,
    ResendVerificationEmail,
    ForgotPass,
    ResetPass,

    //Secure global
    SecureFooter,
    SecureHeader,
    SecureLeftNav,

    //Secure
    AddProfileInfo,
    Profile,


    PostAJob,
    PostAJobPage1,
    PostAJobPage0

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
    },{
      provide:UserObjService, 
      useClass:UserObjService
    },{
      provide:PostAJobObjService, 
      useClass:PostAJobObjService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
