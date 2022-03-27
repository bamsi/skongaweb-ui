import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LocalStoreService } from 'src/app/shared/services/ls.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddTeacherComponent } from '../dialog/add-teacher/add-teacher.component';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.scss'],
  providers: [MessageService, DialogService],
})
export class RegisterTeacherComponent implements OnInit {
  app_user: any;
  public register_teacher: any;
  public institution_id: any;
  public error: any;
  public display = false;
  public subjects: any;
  public grades: any;
  public res: any;

  constructor(
    private ls: LocalStoreService,
    private messageService: MessageService,
    private _teacherSvc: TeacherService,
    public dialogService: DialogService
  ) {
    this.app_user = this.ls.getItem('APP_USER');
    this.institution_id = this.app_user?.institution_id;
  }

  ngOnInit(): void {
    var app_user = this.ls.getItem('APP_USER');
    this.institution_id = app_user?.institution_id;
    this._teacherSvc.getRegisteredTeacher(this.institution_id).subscribe(
      (data) => {
        this.register_teacher = data;
      },
      (error) => console.log('oops', error)
    );
  }

  showDialog() {
    const ref = this.dialogService.open(AddTeacherComponent, {
      data: {
        id: this.institution_id,
      },
      header: 'Add Teacher',
      width: '70%',
    });

    ref.onClose.subscribe((data: any) => {
      let payload = data.value;
      this.submitForm(payload);
    });
  }

  submitForm(data: any) {
    data.institution_id = this.institution_id;
    this._teacherSvc.registerTeacher(data).subscribe(
      (data) => {
        console.log(data);
        this.res = data;
        this.register_teacher = { teacher: this.res?.teacher };
        this.messageService.add({
          key: 'success',
          severity: 'success',
          summary: 'Success Message',
          detail: this.res?.message,
        });
      },
      (error) => {
        this.messageService.add({
          key: 'success',
          severity: 'warn',
          summary: 'Fail Message',
          detail:
            'Fail to register teacher, please check your input data or contract administrator!',
        });
      }
    );
  }

  updateTeacher(data: any) {}

  deleteTeacher(data: any) {}
}
