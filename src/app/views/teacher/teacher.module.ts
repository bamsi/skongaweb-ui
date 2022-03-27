import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { AddTeacherComponent } from './dialog/add-teacher/add-teacher.component';
import { UpdateTeacherComponent } from './dialog/update-teacher/update-teacher.component';

@NgModule({
  declarations: [RegisterTeacherComponent, AddTeacherComponent, UpdateTeacherComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxExtendedPdfViewerModule,
    TeacherRoutingModule,
  ],
})
export class TeacherModule {}
