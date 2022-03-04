import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamResultRoutingModule } from './exam-result-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StudentResultComponent } from './student-result/student-result.component'
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RegisterStudentSubjectComponent } from './register-student-subject/register-student-subject.component';


@NgModule({
  declarations: [
    StudentResultComponent,
    RegisterStudentSubjectComponent,
  ],
  imports: [
    CommonModule,
    ExamResultRoutingModule,
    SharedModule,
    NgxExtendedPdfViewerModule
  ]
})
export class ExamResultModule { }
