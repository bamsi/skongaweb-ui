import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStoreService } from 'src/app/shared/services/ls.service';
import { ResultService } from 'src/app/shared/services/result.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { ResultSummaryComponent } from './dialog/result-summary/result-summary.component';

@Component({
  selector: 'app-publish-result',
  templateUrl: './publish-result.component.html',
  styleUrls: ['./publish-result.component.scss'],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
    DynamicDialogRef,
  ],
})
export class PublishResultComponent implements OnInit {
  public school_calendar: any;
  public institution_id!: number;
  public school_calendar_id!: number;
  public exam: any;
  public class_id!: number;
  public exam_id!: number;
  public is_final!: boolean;
  public grades: any;
  public student_results: any[] = [];
  public cols!: any[];
  public res: any;
  layoutConf: any;
  public display_button = false;
  public success_message: any;
  public error: any;
  public app_user: any;
  public published: number = 0;
  public term_id!: number;

  constructor(
    private _sharedSrv: SharedService,
    private ls: LocalStoreService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private studentSvc: StudentService,
    private resultSvc: ResultService,
    private ref: DynamicDialogRef,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    let app_user = this.ls.getItem('APP_USER');
    this.institution_id = app_user?.institution_id;
    this.is_final = false;
    //subscribe to the current exams
    this.resultSvc.getCurrentExams(this.institution_id).subscribe(
      (data) => (this.exam = data),
      (error) => console.log('oops', error)
    );
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

  getStudentResults() {
    if (
      this.school_calendar_id &&
      this.exam_id &&
      this.class_id &&
      this.is_final == false
    ) {
      let payload = {
        school_calendar_id: this.school_calendar_id,
        class_id: this.class_id,
        exam_id: this.exam_id,
      };
      this.resultSvc.getClassResult(payload).subscribe(
        (data) => {
          this.res = data;
          this.student_results = this.res?.data;
          this.cols = this.res.header;
          this.display_button = true;
          this.published = this.res?.published;
        },
        (error) => console.log('oops', error)
      );
    } else if (
      this.school_calendar_id &&
      this.is_final == true &&
      this.class_id
    ) {
      //get final result
      let payload = {
        school_calendar_id: this.school_calendar_id,
        class_id: this.class_id,
      };
      this.resultSvc.getFinalResult(payload).subscribe(
        (data) => {
          this.res = data?.data;
          this.cols = this.res?.header;
          this.student_results = this.res?.data;
          this.display_button = true;
          this.published = this.res?.published;
          this.term_id = this.res?.term;
        },
        (error) => console.log('oops', error)
      );
    } else {
      //display error message
      this.messageService.add({
        key: 'success',
        severity: 'info',
        summary: 'Error Message',
        detail: 'Please select all required fields!',
      });
    }
  }

  //create result data to excel
  createExcelData() {
    let rows = this.student_results.length;
    let column = this.cols.length;
    let data = new Array(rows).fill(0).map(() => new Array(column));
    for (let j = 0; j < rows; j++) {
      for (let i in this.cols) {
        let item = this.cols[i].field;
        if (this.student_results[j][item]) {
          data[j][item] = this.student_results[j][item];
        } else {
          data[j][item] = '';
        }
      }
    }
    return data;
  }

  exportExcel() {
    let inputData = this.createExcelData();
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(inputData);
      const workbook = {
        Sheets: { data: worksheet },
        SheetNames: ['data'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'exam_results');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  publishResults() {
    this.confirmationService.confirm({
      message:
        'Are you sure that you want publish student results? Results will be visible to parents once published',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (
          this.school_calendar_id &&
          this.exam_id &&
          this.class_id &&
          this.is_final == false
        ) {
          let data = {
            results: this.student_results,
            exam_id: this.exam_id,
            user_id: this.app_user.user.id,
            class_id: this.class_id,
          };

          this.resultSvc.publishResult(data).subscribe(
            (data) => {
              this.res = data;
              this.published = this.res.published;
              this.success_message = this.res.message;
              this.messageService.add({
                key: 'success',
                severity: 'success',
                summary: 'Success Message',
                detail: this.success_message,
              });
            },
            (error) =>
              (this.error = 'Error occurred, please contact administrator')
          );
        } else if (
          this.school_calendar_id &&
          this.is_final == true &&
          this.class_id
        ) {
          let data = {
            results: this.student_results,
            school_calendar_id: this.school_calendar_id,
            class_id: this.class_id,
          };
          this.resultSvc.publishFinalResult(data).subscribe(
            (data) => {
              this.res = data;
              this.published = this.res.published;
              this.success_message = this.res.message;
              this.messageService.add({
                key: 'success',
                severity: 'success',
                summary: 'Success Message',
                detail: this.success_message,
              });
            },
            (error) =>
              (this.error = 'Error occurred, please contact administrator')
          );
        }
      },
      reject: () => {
        this.messageService.add({
          key: 'success',
          severity: 'info',
          summary: 'Success Message',
          detail: 'Publish results cancelled!',
        });
      },
    });
  }

  //send message
  sendSMS() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want send SMS to parents?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (
          this.school_calendar_id &&
          this.exam_id &&
          this.class_id &&
          this.is_final == false
        ) {
          let data = {
            results: this.student_results,
            exam_id: this.exam_id,
            class_id: this.class_id,
          };
          this.resultSvc.publishMessage(data).subscribe(
            (data) => {
              this.res = data;
              this.success_message = this.res.message;
              this.messageService.add({
                key: 'success',
                severity: 'success',
                summary: 'Success Message',
                detail: this.success_message,
              });
            },
            (error) =>
              (this.error = 'Error occurred, please contact administrator')
          );
        } else if (
          this.school_calendar_id &&
          this.is_final == true &&
          this.class_id
        ) {
          let data = {
            results: this.student_results,
            class_id: this.class_id,
          };
          this.resultSvc.publishFinalResultMessage(data).subscribe(
            (data) => {
              this.res = data;
              this.success_message = this.res.message;
              this.messageService.add({
                key: 'success',
                severity: 'success',
                summary: 'Success Message',
                detail: this.success_message,
              });
            },
            (error) =>
              (this.error = 'Error occurred, please contact administrator')
          );
        }
      },
      reject: () => {
        this.messageService.add({
          key: 'success',
          severity: 'info',
          summary: 'Success Message',
          detail: 'Message failed!',
        });
      },
    });
  }

  displaySummary() {
    const ref = this.dialogService.open(ResultSummaryComponent, {
      data: this.student_results,
      header: 'Update Student',
      width: '70%',
      showHeader: false,
    });
  }
}
