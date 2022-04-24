import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublishResultComponent } from './publish-result/publish-result.component';
import { RegisterStudentSubjectComponent } from './register-student-subject/register-student-subject.component';
import { StudentPerformanceComponent } from './student-performance/student-performance.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { UploadResultComponent } from './upload-result/upload-result.component';

const routes: Routes = [
  {
    path: 'student-result',
    component: StudentResultComponent,
  },
  {
    path: 'student-subject',
    component: RegisterStudentSubjectComponent,
  },
  {
    path: 'upload-result',
    component: UploadResultComponent,
  },
  {
    path: 'student-performance',
    component: StudentPerformanceComponent,
  },
  {
    path: 'publish-result',
    component: PublishResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamResultRoutingModule {}
