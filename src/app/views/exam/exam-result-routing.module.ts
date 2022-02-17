import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentResultComponent } from './student-result/student-result.component';

const routes: Routes = [
  {
    path: 'student-result', 
    component: StudentResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamResultRoutingModule { }
