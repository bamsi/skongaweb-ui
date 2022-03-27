import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LocalStoreService } from 'src/app/shared/services/ls.service';
import { ResultService } from 'src/app/shared/services/result.service';
import * as FileSaver from 'file-saver';
import { TeacherService } from 'src/app/shared/services/teacher.service';

@Component({
  selector: 'app-upload-result',
  templateUrl: './upload-result.component.html',
  styleUrls: ['./upload-result.component.scss'],
  providers: [MessageService],
})
export class UploadResultComponent implements OnInit {
  constructor(
    private ls: LocalStoreService,
    private messageService: MessageService,
    private _resultSvc: ResultService,
    private _teacherSvc: TeacherService
  ) {}

  public exam: any;
  public subject: any;
  public grade: any;
  public subject_id: any;
  public class_id: any;
  public exam_id: any;
  public results: any;
  public res: any;
  public institution_id: any;

  @ViewChild('submit') button: any;

  ngOnInit() {
    var app_user = this.ls.getItem('APP_USER');
    console.log(app_user);

    this.institution_id = app_user?.institution_id;
    //subscribe to the current exams
    this._resultSvc.getCurrentExams(this.institution_id).subscribe(
      (data) => (this.exam = data),
      (error) => console.log('oops', error)
    );
    //subscribe to subjects taught by a teacher
    this._teacherSvc.getTeacherSubject().subscribe(
      (data) => (this.subject = data),
      (error) => console.log('oops', error)
    );
  }

  public getTeacherClass(subject_id: any) {
    this._resultSvc.getTeacherClass(subject_id).subscribe(
      (data) => (this.grade = data),
      (error) => console.log('oops', error)
    );
  }

  public getStudentResult(class_id: any) {
    let payload = {
      exam_schedule_id: this.exam_id,
      class_id: class_id,
      subject_id: this.subject_id,
    };
    this._resultSvc.getStudentResult(payload).subscribe(
      (data) => (this.results = data),
      (error) => console.log('oops', error)
    );
  }

  public enableSubmitButton() {
    this.button.nativeElement.disabled = false;
  }

  public submitResult() {
    this.button.nativeElement.disabled = true;
    let payload = { exam_schedule_id: this.exam_id, result: this.results };
    this._resultSvc.submitResult(payload).subscribe(
      (data) => {
        this.res = data;
        this.results = { student_result: this.res.student_result };
        let message = this.res.message;
        this.messageService.add({
          key: 'success',
          severity: 'success',
          summary: 'Success Message',
          detail: message,
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

  exportExcel() {
    let input_data = this.createExcelData();
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(input_data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'student_file');
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

  createExcelData() {
    let data = this.results!.student_result;
    let rows = data.length;
    let result = [];
    for (let j = 0; j < rows; j++) {
      result[j] = {
        SN: j + 1,
        STUDENTID: data[j].preferred_id,
        FIRST_NAME: data[j].first_name,
        MIDDLE_NAME: data[j].middle_name,
        LAST_NAME: data[j].last_name,
        MARKS: data[j].marks,
      };
    }
    return result;
  }

  onFileChange(e: any) {
    try {
      const fileName = e.target.files[0].name;
      import('xlsx').then((xlsx) => {
        let workBook: any = null;
        let jsonData = null;
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
            const sheet = workBook.Sheets[name];
            initial[name] = xlsx.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          let result = jsonData[Object.keys(jsonData)[0]];
          this.mapResult(result);
        };
        reader.readAsBinaryString(e.target.files[0]);
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  mapResult(result: any) {
    this.results.student_result.forEach((element: any) => {
      let id = element.preferred_id;
      let item = result.find((e: any) => e.STUDENTID == id);
      element.marks = item.MARKS;
      this.enableSubmitButton();
    });
  }
}
