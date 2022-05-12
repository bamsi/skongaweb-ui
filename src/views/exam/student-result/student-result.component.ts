import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStoreService } from 'src/app/shared/services/ls.service';
import { ResultService } from 'src/app/shared/services/result.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.scss'],
  providers: [MessageService],
})
export class StudentResultComponent implements OnInit {
  constructor(
    private ls: LocalStoreService,
    private _resultSvc: ResultService,
    private messageService: MessageService
  ) {}

  public results!: [];
  public student_details: any;
  public result_summary: any;
  public res: any;
  public app_user: any;
  public success_message: any;
  public feedback: any;
  public user_id: any;
  public performance: any;
  public remarks: any;
  public institution: any;
  public path: any;

  parentFeebackForm = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.app_user = this.ls.getItem('APP_USER');
    this.user_id = this.app_user?.id;
    this.institution = this.app_user?.institution;
    this.getStudentResults(this.user_id);
  }

  getStudentResults(user_id: any) {
    this._resultSvc.getStudentResultByUser(user_id).subscribe(
      (response) => {
        this.res = response;
        this.results = this.res?.results;
        this.student_details = this.res?.student_details;
        this.result_summary = this.res?.result_summary;
        this.feedback = this.res?.feedback;
      },
      (error) => {
        this.messageService.add({
          key: 'success',
          severity: 'warn',
          summary: 'Notification Message',
          detail: error?.error?.error,
        });
      }
    );
  }

  submitFeedback() {
    let message = this.parentFeebackForm.value.message;
    let class_id = this.student_details.class_id;
    let student_id = this.student_details.student_id;
    this.parentFeebackForm.reset();
    let data = {
      student_id: student_id,
      class_id: class_id,
      message: message,
      exam_id: this.student_details.exam_id,
    };

    this._resultSvc.postParentFeedback(data).subscribe(
      (response) => {
        //display message
        this.res = response;
        this.success_message = this.res.message;
        this.feedback = this.res.feedback;
        this.messageService.add({
          key: 'success',
          severity: 'success',
          summary: 'Success Message',
          detail: this.success_message,
        });
      },
      (error) => {
        this.messageService.add({
          key: 'success',
          severity: 'warn',
          summary: 'Notification Message',
          detail: error?.error?.error,
        });
      }
    );
  }

  handleChange(e: any) {
    var index = e.index;
    if (index == 1) {
      //get final results
      if (this.path == undefined) {
        //get data
        this.getFinalResult(this.user_id);
      }
    }
  }

  getFinalResult(user_id: any) {}
}
