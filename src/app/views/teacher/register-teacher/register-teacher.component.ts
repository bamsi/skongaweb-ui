import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStoreService } from 'src/app/shared/services/ls.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddTeacherComponent } from '../dialog/add-teacher/add-teacher.component';
import { UpdateTeacherComponent } from '../dialog/update-teacher/update-teacher.component';
import { AssignSubjectComponent } from '../dialog/assign-subject/assign-subject.component';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService],
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
    public dialogService: DialogService,
    private confService: ConfirmationService
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
      if (data) {
        let payload = data.value;
        this.submitForm(payload);
      }
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

  updateTeacher(data: any) {
    const ref = this.dialogService.open(UpdateTeacherComponent, {
      data: data,
      header: 'Update Teacher',
      width: '70%',
    });

    ref.onClose.subscribe((data: any) => {
      if (data) {
        this.editTeacher(data);
      }
    });
  }

  editTeacher(data: any) {
    this._teacherSvc.updateTeacher(data).subscribe(
      (data) => {
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

  deleteTeacher(data: any) {
    const name = data.first_name + data.last_name;
    let message = '';
    console.log(data.active);
    if (data.active == 1) {
      message = `Are you sure that you want to  <b>  delete ${name}  </b> ?`;
    } else {
      message = `Are you sure that you want to <b>  activate ${name}  </b> ?`;
    }

    this.confService.confirm({
      key: 'deleteDialog',
      message: message,
      header: 'Confirm delete teacher',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        data.active = data.active == 1 ? 0 : 1;
        this.editTeacher(data);
      },
      reject: () => {},
    });
  }

  updateSubject(data: any) {
    const ref = this.dialogService.open(AssignSubjectComponent, {
      data: data,
      header: 'Assign Subject',
      width: '50%',
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        this._teacherSvc.assignTeacherSubject(data).subscribe(
          (data) => {
            this.res = data;
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
    });
  }
}
