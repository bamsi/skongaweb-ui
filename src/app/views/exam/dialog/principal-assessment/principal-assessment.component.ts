import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResultService } from 'src/app/shared/services/result.service';

@Component({
  selector: 'app-principal-assessment',
  templateUrl: './principal-assessment.component.html',
  styleUrls: ['./principal-assessment.component.scss'],
})
export class PrincipalAssessmentComponent implements OnInit {
  public class_id!: number;
  public student: any;
  public student_id!: number;
  public term_id!: number;
  public performance: any;
  public commentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private resultSvc: ResultService
  ) {}

  ngOnInit(): void {
    this.class_id = this.config.data.class_id;
    this.student = this.config.data.student;
    this.term_id = this.config.data.term_id;
    this.student_id = this.student.id;

    this.commentForm = this.initForm();
    let payload = {
      class_id: this.class_id,
      student_id: this.student_id,
      term_id: this.term_id,
    };
    this.resultSvc.getComment(payload).subscribe((data) => {
      this.performance = data.result;
      this.commentForm.patchValue({
        comments: this.performance.principal_comment,
      });
    });
  }

  initForm() {
    return this.fb.group({
      apply_all: [false],
      comments: ['', Validators.required],
    });
  }

  closeDialog() {
    this.ref.close();
  }

  submitForm() {
    let data = this.commentForm.value;
    let payload = {
      id: this.performance.id,
      class_id: this.class_id,
      term_id: this.term_id,
      comment: data,
    };
    console.log(payload);
    this.ref.close(payload);
  }
}
