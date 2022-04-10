import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamResultRoutingModule } from './exam-result-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StudentResultComponent } from './student-result/student-result.component'
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RegisterStudentSubjectComponent } from './register-student-subject/register-student-subject.component';
import { UploadResultComponent } from './upload-result/upload-result.component';
import { StudentPerformanceComponent } from './student-performance/student-performance.component';
import { AddPerformanceComponent } from './dialog/add-performance/add-performance.component';
import { PrincipalAssessmentComponent } from './dialog/principal-assessment/principal-assessment.component';


@NgModule({
  declarations: [
    StudentResultComponent,
    RegisterStudentSubjectComponent,
    UploadResultComponent,
    StudentPerformanceComponent,
    AddPerformanceComponent,
    PrincipalAssessmentComponent,
  ],
  imports: [
    CommonModule,
    ExamResultRoutingModule,
    SharedModule,
    NgxExtendedPdfViewerModule
  ]
})
export class ExamResultModule { }
