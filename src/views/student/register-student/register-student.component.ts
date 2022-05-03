import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStoreService } from 'src/app/shared/services/ls.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentService } from 'src/app/shared/services/student.service';
import * as XLSX from 'xlsx';
import { UpdateStudentComponent } from '../dialog/update-student/update-student.component';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService],
})
export class RegisterStudentComponent implements OnInit {
  public grades: any;
  public school_calendar: any;
  public institution_id!: number;
  public students: any;
  public class_id!: number;
  public school_calendar_id!: number;
  public data_file: any;
  public display = false;
  public res: any;
  public error: any;

  constructor(
    private ls: LocalStoreService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private confService: ConfirmationService,
    private _sharedSrv: SharedService,
    private _studentSrv: StudentService
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

  getStudents() {
    if (this.school_calendar_id && this.class_id) {
      const payload = {
        institution_id: this.institution_id,
        school_calendar_id: this.school_calendar_id,
        class_id: this.class_id,
      };
      this._studentSrv.getStudents(payload).subscribe(
        (data) => (this.students = data),
        (error) => console.log('oops', error)
      );
    }
  }

  onFileChange(e: any) {
    try {
      const fileName = e.target.files[0].name;
      import('xlsx').then((xlsx) => {
        let workBook: XLSX.WorkBook | null = null;
        let jsonData = null;
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial: any, name) => {
            if (workBook) {
              const sheet = workBook.Sheets[name];
              initial[name] = xlsx.utils.sheet_to_json(sheet);
              return initial;
            }
          }, {});
          this.data_file = jsonData[Object.keys(jsonData)[0]];
          this.display = true;
        };
        reader.readAsBinaryString(e.target.files[0]);
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  uploadStudent() {
    //this.myInput.nativeElement.value = "";
    let data = {
      school_calendar_id: this.school_calendar_id,
      class_id: this.class_id,
      students: this.data_file,
      institution_id: this.institution_id,
    };

    this.display = false;
    this._studentSrv.importStudents(data).subscribe(
      (data) => {
        this.res = data;
        this.students = { data: this.res?.data };
        this.messageService.add({
          key: 'success',
          severity: 'success',
          summary: 'Success Message',
          detail: this.res?.message,
        });
      },
      (error) =>
        (this.error = 'Failed to import students, please contact administrator')
    );
  }

  updateStudent(student: any) {
    const ref = this.dialogService.open(UpdateStudentComponent, {
      data: student,
      header: 'Update Student',
      width: '70%',
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        this._studentSrv
          .updateStudent(data, this.class_id, this.school_calendar_id)
          .subscribe(
            (response) => {
              this.res = response;
              this.students = { data: this.res?.data };
              this.messageService.add({
                key: 'success',
                severity: 'success',
                summary: 'Success Message',
                detail: this.res?.message,
              });
            },
            (error) => {
              this.error =
                'Failed to update student, please contact administrator';
            }
          );
      }
    });
  }
}
