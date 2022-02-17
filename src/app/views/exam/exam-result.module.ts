import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamResultRoutingModule } from './exam-result-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StudentResultComponent } from './student-result/student-result.component'
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [
    StudentResultComponent,
  ],
  imports: [
    CommonModule,
    ExamResultRoutingModule,
    SharedModule,
    NgxExtendedPdfViewerModule
  ]
})
export class ExamResultModule { }
