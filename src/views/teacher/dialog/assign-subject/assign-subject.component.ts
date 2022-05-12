import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';

@Component({
  selector: 'app-assign-subject',
  templateUrl: './assign-subject.component.html',
  styleUrls: ['./assign-subject.component.scss'],
})
export class AssignSubjectComponent implements OnInit {
  teacherForm!: FormGroup;
  public grades: any;
  public subjects: any;
  public teacher: any;
  public teacher_subjects: any[] = [];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _teacherSvc: TeacherService,
    private _sharedSrv: SharedService
  ) {
    this.teacher = this.config.data;
    this.teacherForm = this.initForm();
    this.getTeacherSubjects();
  }

  ngOnInit(): void {
    this._sharedSrv.getSubject().subscribe(
      (data) => {
        this.subjects = data;
      },
      (error) => console.log('oops', error)
    );
    this._sharedSrv.getGrade(this.teacher.institution_id).subscribe(
      (data) => {
        this.grades = data;
      },
      (error) => console.log('oops', error)
    );
  }

  initForm() {
    return this.fb.group({
      teacher_id: [this.teacher.id, Validators.required],
      subject: ['', Validators.required],
      class: ['', Validators.required],
    });
  }

  //get subjects assigned to a teacher
  getTeacherSubjects() {
    this._teacherSvc
      .teacherSubjectAssigned(this.teacher.id)
      .subscribe((data) => {
        this.teacher_subjects = data.teacher_subjects;
      });
  }

  addItem() {
    let value = this.teacherForm.value;
    let item = {
      id: null,
      teacher_id: this.teacher.id,
      subject_id: value.subject.id,
      class_id: value.class.id,
      subject: value.subject.name,
      class: value.class.name,
    };
    this.teacher_subjects.push(item);
    this.teacherForm.reset();
  }
  deleteItem(index: any) {
    console.log(index);
    this.teacher_subjects.splice(index, 1);
  }

  closeDialog() {
    this.ref.close();
  }

  submitForm() {
    let payload = {
      id: this.teacher.id,
      teacher_subject: this.teacher_subjects,
    };
    this.ref.close(payload);
  }
}
