import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterStudentSubjectComponent } from './register-student-subject/register-student-subject.component';
import { StudentResultComponent } from './student-result/student-result.component';

const routes: Routes = [
  {
    path: 'student-result',
    component: StudentResultComponent,
  },
  {
    path: 'student-subject',
    component: RegisterStudentSubjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamResultRoutingModule {}
