import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LocalStoreService } from 'src/app/shared/services/ls.service';
import { ResultService } from 'src/app/shared/services/result.service';

@Component({
  selector: 'app-register-student-subject',
  templateUrl: './register-student-subject.component.html',
  styleUrls: ['./register-student-subject.component.scss'],
  providers: [MessageService],
})
export class RegisterStudentSubjectComponent implements OnInit {
  public subject: any;
  public grade: any;
  public register_student: any;
  public selected_Students = [];
  public institution_id: any;
  public subject_id: any;
  public class_id: any;
  public allRegistered: boolean = false;
  public app_user: any;

  constructor(
    private ls: LocalStoreService,
    private messageService: MessageService,
    private _resultSvc: ResultService
  ) {}

  @ViewChild('submit') button: { nativeElement: { disabled: boolean } } | any;

  ngOnInit(): void {
    this.app_user = this.ls.getItem('APP_USER');
    console.log(this.app_user);
    this.institution_id = this.app_user?.institution_id;
    this._resultSvc.getTeacherSubject().subscribe(
      (response) => {
        this.subject = response;
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

    this._resultSvc.getGrade(this.institution_id).subscribe(
      (response) => {
        this.grade = response;
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

  registeredStudent() {
    if (this.class_id != null || this.subject_id != null) {
      this._resultSvc
        .getRegisteredStudent(this.class_id, this.subject_id)
        .subscribe(
          (response) => {
            this.register_student = response;
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
  }

  public enableSubmitButton() {
    this.button.nativeElement.disabled = false;
  }

  setAll(registered: boolean) {
    this.allRegistered = registered;
    if (this.register_student.result == null) {
      return;
    }
    this.register_student.result.forEach(
      (t: any) => (t.is_registered = registered)
    );
    this.enableSubmitButton();
  }

  updateAllComplete() {
    this.allRegistered =
      this.register_student.result != null &&
      this.register_student.result.every((t: any) => t.is_registered);
    this.enableSubmitButton();
  }

  someComplete(): boolean {
    if (this.register_student?.result == null) {
      return false;
    }
    return (
      this.register_student.result.filter((t: any) => t.is_registered).length >
        0 && !this.allRegistered
    );
  }

  submitResult() {
    this.button.nativeElement.disabled = true;
    const payload = {
      student: this.register_student,
      subject_id: this.subject_id,
      class_id: this.class_id,
    };
    this._resultSvc.updateRegisteredStudentSubject(payload).subscribe(
      (response) => {
        this.register_student = { result: response?.result };
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
}
