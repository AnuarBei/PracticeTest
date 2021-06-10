import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { MaterialModule } from './material/material.module';
import { ButtonComponent } from './elements/button/button.component';
import { InputComponent } from './elements/input/input.component';
import { CheckboxComponent } from './elements/checkbox/checkbox.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { SelectComponent } from './elements/select/select.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { StepOneComponent } from './registration/step-one/step-one.component';
import { StepTwoComponent } from './registration/step-two/step-two.component';
import { StepThreeComponent } from './registration/step-three/step-three.component';
import { StepFourComponent } from './registration/step-four/step-four.component';
import { ImageUploaderComponent } from './elements/image-uploader/image-uploader.component';
import { DatepickerComponent } from './elements/datepicker/datepicker.component';
import { NewsComponent } from './news/news.component';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './profile/home/home.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { InformationComponent } from './profile/information/information.component';
import { PlanComponent } from './profile/plan/plan.component';
import { CoursesComponent } from './profile/courses/courses.component';
import { CertificatesComponent } from './profile/certificates/certificates.component';
import { LibraryComponent } from './profile/library/library.component';
import { ReferenceComponent } from './profile/reference/reference.component';
import { FeedbackComponent } from './profile/feedback/feedback.component';
import { MenuComponent } from './profile/menu/menu.component';
import { EditingComponent } from './profile/profile-info/editing/editing.component';
import { HowToStartComponent } from './profile/information/how-to-start/how-to-start.component';
import { AboutComponent } from './about/about.component';
import { TrainingComponent } from './training/training.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SearchComponent } from './search/search.component';
import { RadioButtonComponent } from './elements/radio-button/radio-button.component';
import { CustomSelectComponent } from './elements/custom-select/custom-select.component';
import { NumberpickerComponent } from './elements/numberpicker/numberpicker.component';
import { BookCardComponent } from './profile/library/book-card/book-card.component';
import { CourseCardComponent } from './profile/courses/course-card/course-card.component';
import { LightboxComponent } from './elements/lightbox/lightbox.component';
import { CertificateCardComponent } from './profile/certificates/certificate-card/certificate-card.component';
import { CourseComponent } from './profile/courses/course/course.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestComponent } from './profile/courses/course/test/test.component';
import { TestResultsComponent } from './profile/courses/course/test-results/test-results.component';
import { TestPassedAlertComponent } from './profile/courses/course/test/test-passed-alert/test-passed-alert.component';
import { MustBeAnsweredAlertComponent } from './profile/courses/course/test/must-be-answered-alert/must-be-answered-alert.component';
import { TimeIsUpAlertComponent } from './profile/courses/course/test/time-is-up-alert/time-is-up-alert.component';
import { DialogComponent } from './elements/dialog/dialog.component';
import { PreTestRequiredAlertComponent } from './profile/courses/pre-test-required-alert/pre-test-required-alert.component';
import { MainComponent } from './main/main.component';
import { AutofocusDirective } from './autofocus.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthorizationInterceptorService} from './authorization-interceptor.service';
import {SafePipeModule} from 'safe-pipe';
import {SavedAlertComponent} from './profile/profile-info/saved-alert/saved-alert.component';
import { FillInRequiredFieldsAlertComponent } from './registration/fill-in-required-fields-alert/fill-in-required-fields-alert.component';
import { AreYouSureAlertComponent } from './header/are-you-sure-alert/are-you-sure-alert.component';
import { EmailIsRequiredComponent } from './registration/email-is-required/email-is-required.component';
import { ChooseCourseAlertComponent } from './training/choose-course-alert/choose-course-alert.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthorizationComponent,
    RegistrationComponent,
    PageTitleComponent,
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
    PasswordRecoveryComponent,
    SelectComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    ImageUploaderComponent,
    DatepickerComponent,
    NewsComponent,
    NewsArticleComponent,
    ProfileComponent,
    HomeComponent,
    ProfileInfoComponent,
    InformationComponent,
    PlanComponent,
    CoursesComponent,
    CertificatesComponent,
    LibraryComponent,
    ReferenceComponent,
    FeedbackComponent,
    MenuComponent,
    EditingComponent,
    HowToStartComponent,
    AboutComponent,
    TrainingComponent,
    ContactsComponent,
    SearchComponent,
    RadioButtonComponent,
    CustomSelectComponent,
    NumberpickerComponent,
    BookCardComponent,
    CourseCardComponent,
    LightboxComponent,
    CertificateCardComponent,
    CourseComponent,
    PageNotFoundComponent,
    TestComponent,
    TestResultsComponent,
    TestPassedAlertComponent,
    MustBeAnsweredAlertComponent,
    TimeIsUpAlertComponent,
    SavedAlertComponent,
    DialogComponent,
    PreTestRequiredAlertComponent,
    MainComponent,
    AutofocusDirective,
    FillInRequiredFieldsAlertComponent,
    AreYouSureAlertComponent,
    EmailIsRequiredComponent,
    ChooseCourseAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    SafePipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
