import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss'],
})
export class UpdateTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  private teacherData: any;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.teacherData = this.config.data;
    this.teacherForm = this.initForm();
  }

  ngOnInit(): void {}

  initForm() {
    return this.fb.group({
      id: [this.teacherData.id],
      active: [this.teacherData.active],
      institution_id: [this.teacherData.institution_id],
      first_name: [this.teacherData.first_name, Validators.required],
      middle_name: [this.teacherData.middle_name],
      last_name: [this.teacherData.last_name, Validators.required],
      gender: [this.teacherData.gender, Validators.required],
      address: [this.teacherData.address],
      email: [this.teacherData.email, Validators.email],
      phone: [
        this.teacherData.phone,
        [Validators.minLength(12), Validators.required],
      ],
      class_teacher: [this.teacherData.class_teacher],
    });
  }

  closeDialog() {
    this.ref.close();
  }

  submitForm() {
    this.ref.close(this.teacherForm.value);
  }
}
