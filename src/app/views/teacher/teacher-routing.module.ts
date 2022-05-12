import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';

const routes: Routes = [
  {
    path: 'register-teacher',
    component: RegisterTeacherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
