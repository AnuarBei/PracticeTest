import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
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
import { TrainingComponent } from './training/training.component';
import { CourseComponent } from './profile/courses/course/course.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestComponent } from './profile/courses/course/test/test.component';
import { TestResultsComponent } from './profile/courses/course/test-results/test-results.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { ContactsComponent } from './contacts/contacts.component';
import {AboutComponent} from './about/about.component';


const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'authorization', component: AuthorizationComponent, data: { routeName: 'authorization' } },
  { path: 'password-recovery', component: PasswordRecoveryComponent, data: { routeName: 'passwordRecovery' } },
  { path: 'registration', component: RegistrationComponent, data: { routeName: 'registration' } },
  { path: 'search', component: SearchComponent, data: { routeName: 'search' } },
  { path: 'contacts', component: ContactsComponent, data: { routeName: 'contacts' } },
  { path: 'about', component: AboutComponent, data: { routeName: 'about' } },
  {
    path: 'news',
    children: [
      { path: '', component: NewsComponent, data: { routeName: 'news' } },
      { path: ':id', component: NewsArticleComponent, data: { routeName: 'news' } }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', component: HomeComponent, data: { routeName: 'profile' } },
      { path: 'profile-info', component: ProfileInfoComponent, data: { routeName: 'profile' } },
      { path: 'information', component: InformationComponent, data: { routeName: 'training' } },
      { path: 'plan', component: PlanComponent, data: { routeName: 'training' } },
      {
        path: 'courses',
        children: [
          { path: '', component: CoursesComponent, data: { routeName: 'myCourses' } },
          { path: 'test/:id', component: TestComponent, data: { routeName: 'testing' } },
          { path: 'test-results/:id', component: TestResultsComponent, data: { routeName: 'results' } },
          { path: ':id', component: CourseComponent, data: { routeName: 'course' } }
        ]
      },
      { path: 'certificates', component: CertificatesComponent, data: { routeName: 'profile' } },
      { path: 'library', component: LibraryComponent, data: { routeName: 'profile' } },
      { path: 'reference', component: ReferenceComponent, data: { routeName: 'profile' } },
      { path: 'feedback', component: FeedbackComponent, data: { routeName: 'profile' } }
    ]
  },
  { path: 'training/:id', component: TrainingComponent, data: { routeName: 'training' } },
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
