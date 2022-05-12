import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResultService } from 'src/app/shared/services/result.service';

@Component({
  selector: 'app-add-performance',
  templateUrl: './add-performance.component.html',
  styleUrls: ['./add-performance.component.scss'],
})
export class AddPerformanceComponent implements OnInit {
  public performanceForm!: FormGroup;
  public items: any[] = [];
  public grades: any;
  public class_id!: number;
  public student: any;
  public student_id!: number;
  public term_id!: number;
  public summary: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public resultSvc: ResultService
  ) {}

  ngOnInit(): void {
    this.grades = [
      { name: 'A', code: 'A' },
      { name: 'B', code: 'B' },
      { name: 'C', code: 'C' },
      { name: 'D', code: 'D' },
      { name: 'E', code: 'E' },
      { name: 'F', code: 'F' },
    ];
    this.class_id = this.config.data.class_id;
    this.student = this.config.data.student;
    this.term_id = this.config.data.term_id;
    this.student_id = this.student.id;

    this.initForm();

    let payload = {
      class_id: this.class_id,
      student_id: this.student_id,
      term_id: this.term_id,
    };
    this.resultSvc.getPerformance(payload).subscribe((data) => {
      this.items = data.result;
      this.summary = data.summary;
      let comment = this.summary?.teacher_comment;
      this.performanceForm.patchValue({ comments: comment });
      this.addPerformance();
    });
  }

  initForm() {
    this.performanceForm = this.fb.group({
      apply_all: [''],
      comments: ['', Validators.required],
      performance: new FormArray([]),
    });
  }

  get f() {
    return this.performanceForm.controls;
  }

  get t() {
    return this.f['performance'] as FormArray;
  }

  ///add performance items
  addPerformance() {
    this.items.forEach((item) => {
      this.t.push(
        this.fb.group({
          apply_all: [''],
          grade: [item.grade, Validators.required],
        })
      );
    });
  }

  submitForm() {
    console.log(this.performanceForm.value);
    let data = this.performanceForm.value;
    let performance = data.performance;
    let items = [];
    for (let i = 0; i < performance.length; i++) {
      let j = {
        student_id: this.student_id,
        performance_id: this.items[i].id,
        term_id: this.term_id,
        class_id: this.class_id,
        grade: performance[i].grade,
      };
      items.push(j);
    }
    //prepare data
    data['performance'] = items;
    data['student_id'] = this.student_id;
    data['term_id'] = this.term_id;
    data['class_id'] = this.class_id;
    this.ref.close(data);
  }

  closeDialog() {
    this.ref.close();
  }
}
