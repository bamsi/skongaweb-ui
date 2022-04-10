import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss'],
})
export class UpdateStudentComponent implements OnInit {
  studentForm!: FormGroup;
  studentData: any;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.studentData = this.config.data;
    console.log(this.studentData);
    this.studentForm = this.initForm();
  }

  initForm() {
    return this.fb.group({
      id: [this.studentData.id],
      active: [this.studentData.active],
      first_name: [this.studentData.first_name, Validators.required],
      middle_name: [this.studentData.middle_name],
      last_name: [this.studentData.last_name, Validators.required],
      gender: [this.studentData.gender, Validators.required],
      address: [this.studentData.address],
      email: [this.studentData.email, Validators.email],
      phone: [
        this.studentData.phone,
        [Validators.minLength(12), Validators.required],
      ],
      institution_id: [this.studentData.institution_id],
    });
  }

  closeDialog() {
    this.ref.close();
  }

  submitForm() {
    this.ref.close(this.studentForm.value);
  }
}
