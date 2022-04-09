import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './layout/private/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
  },
  //authenticated users only
  {
    path: 'main',
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: '',
        data: { breadcrumb: 'Dashboard' },
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
      {
        path: 'exam',
        data: { breadcrumb: 'Student Results' },
        loadChildren: () =>
          import('./views/exam/exam-result.module').then(
            (module) => module.ExamResultModule
          ),
      },
      {
        path: 'teacher',
        data: { breadcrumb: 'Teacher Module' },
        loadChildren: () =>
          import('./views/teacher/teacher.module').then(
            (module) => module.TeacherModule
          ),
      },
      {
        path: 'student',
        data: { breadcrumb: 'Student Module' },
        loadChildren: () =>
          import('./views/student/student.module').then(
            (module) => module.StudentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
