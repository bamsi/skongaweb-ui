import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStoreService } from 'src/app/shared/services/ls.service';
import { ResultService } from 'src/app/shared/services/result.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { AddPerformanceComponent } from '../dialog/add-performance/add-performance.component';
import { PrincipalAssessmentComponent } from '../dialog/principal-assessment/principal-assessment.component';

@Component({
  selector: 'app-student-performance',
  templateUrl: './student-performance.component.html',
  styleUrls: ['./student-performance.component.scss'],
  providers: [MessageService, DialogService],
})
export class StudentPerformanceComponent implements OnInit {
  public school_calendar: any;
  public app_user: any;
  public institution_id!: number;
  public grades: any;
  public class_id!: number;
  public school_calendar_id!: number;
  public school_term: any;
  public term_id!: number;
  public student_list: any[] = [];
  public ref!: DynamicDialogRef;
  public success_message: any;
  public error: any;

  constructor(
    private _sharedSrv: SharedService,
    private ls: LocalStoreService,
    private messageService: MessageService,
    public dialogService: DialogService,
    public studentSvc: StudentService,
    public resultSvc: ResultService
  ) {}

  ngOnInit(): void {
    var app_user = this.ls.getItem('APP_USER');
    this.institution_id = app_user?.institution_id;
    this._sharedSrv.getGrade(this.institution_id).subscribe(
      (data) => {
        this.grades = data;
      },
      (error) => console.log('oops', error)
    );
    this._sharedSrv.getSchoolCalendar(this.institution_id).subscribe(
      (data) => {
        this.school_calendar = data;
      },
      (error) => console.log('oops', error)
    );
  }

  loadTerms(school_calendar_id: any) {
    this._sharedSrv.getSchoolTerm(school_calendar_id).subscribe(
      (data) => {
        this.school_term = data;
      },
      (error) => console.log('oops', error)
    );
  }

  loadStudents() {
    if (this.class_id != null && this.school_calendar_id != null) {
      let payload = {
        class_id: this.class_id,
        school_calendar_id: this.school_calendar_id,
      };
      this.studentSvc.getStudentsByClass(payload).subscribe((data) => {
        this.student_list = data.result;
      });
    }
  }

  openPerformance(result: any) {
    this.ref = this.dialogService.open(AddPerformanceComponent, {
      header: 'Update Student Performance',
      data: { student: result, class_id: this.class_id, term_id: this.term_id },
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((data) => {
      if (data) {
        //save data
        this.resultSvc.savePerformance(data).subscribe(
          (response) => {
            this.success_message = response.message;
            this.messageService.add({
              key: 'success',
              severity: 'success',
              summary: 'Success Message',
              detail: this.success_message,
            });
          },
          (error) =>
            (this.error =
              'Error on update performance, please contact administrator')
        );
      }
    });
  }

  openComment(result: any) {
    this.ref = this.dialogService.open(PrincipalAssessmentComponent, {
      header: 'Update Student Performance',
      data: { student: result, class_id: this.class_id, term_id: this.term_id },
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((data) => {
      if (data) {
        //save data
        this.resultSvc.savePerformanceComment(data).subscribe(
          (response) => {
            this.success_message = response.message;
            this.messageService.add({
              key: 'success',
              severity: 'success',
              summary: 'Success Message',
              detail: this.success_message,
            });
          },
          (error) =>
            (this.error =
              'Error on update performance comments, please contact administrator')
        );
      }
    });
  }
}
