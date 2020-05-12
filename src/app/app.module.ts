import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RegisterPage0 }from './register/components/recruiterPage0/RegisterPage0.component';
import { RegisterPage1 }from './register/components/recruiterPage1/RegisterPage1.component';
import { RegisterPage2 }from './register/components/recruiterPage2/RegisterPage2.component';
import { AppComponent } from './app.component';
import { RegisterFooter } from './register/components/globalComponents/footer/footer.component'
import { ProgressBar } from './register/components/globalComponents/progressBar/progressBar.component'
import { RouterModule } from '@angular/router';
import { routes } from './app.routing.module'
import { RegisterModelService } from './services/model.service'
@NgModule({
  declarations: [
    AppComponent,

    //register pages 
    RegisterPage0,
    RegisterPage1,
    RegisterPage2,

    //register global 
    RegisterFooter,
    ProgressBar
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RegisterModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
