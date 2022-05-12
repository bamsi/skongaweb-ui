import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterStudentComponent } from './register-student/register-student.component';

const routes: Routes = [
  {
    path: 'register-student',
    component: RegisterStudentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
