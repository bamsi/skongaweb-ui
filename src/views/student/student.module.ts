import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { SharedModule } from '../../shared/shared.module';
import { UpdateStudentComponent } from './dialog/update-student/update-student.component';

@NgModule({
  declarations: [RegisterStudentComponent, UpdateStudentComponent],
  imports: [CommonModule, StudentRoutingModule, SharedModule],
})
export class StudentModule {}
