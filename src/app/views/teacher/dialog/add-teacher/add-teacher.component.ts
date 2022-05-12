import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss'],
})
export class AddTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  public institution_id: any;
  public subjects: any;
  public grades: any;

  constructor(
    private fb: FormBuilder,
    private _sharedSrv: SharedService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.institution_id = this.config.data.id;
    this.teacherForm = this.initForm();
  }

  ngOnInit(): void {
    this._sharedSrv.getSubject().subscribe(
      (data) => {
        this.subjects = data;
      },
      (error) => console.log('oops', error)
    );
    this._sharedSrv.getGrade(this.institution_id).subscribe(
      (data) => {
        this.grades = data;
      },
      (error) => console.log('oops', error)
    );
  }

  // getter for easier access
  get subjectsFormArr(): FormArray {
    return this.teacherForm.get('subjects') as FormArray;
  }

  initForm() {
    return this.fb.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      address: [''],
      email: ['', Validators.email],
      phone: ['', [Validators.minLength(12), Validators.required]],
      class_teacher: [false],
      subjects: this.fb.array([]),
    });
  }

  addRound() {
    this.subjectsFormArr.push(
      this.fb.group({
        subject_id: ['', Validators.required],
        class_id: ['', Validators.required],
      })
    );
  }

  removeRound(index: number) {
    this.subjectsFormArr.removeAt(index);
  }

  closeDialog() {
    this.ref.close();
  }

  submitForm() {
    this.ref.close(this.teacherForm);
  }
}
