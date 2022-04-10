import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  getNavigation() {
    return [
      {
        name: 'Home',
        type: 'link',
        icon: 'home',
        state: 'main',
        permission: 'ALL_USERS',
      },
      {
        name: 'Student Results',
        type: 'link',
        icon: 'assignment',
        state: 'main/exam/student-result',
        permission: 'STUDENT_RESULT',
      },
      {
        name: 'Assign Student Subject',
        type: 'link',
        icon: 'person_add',
        state: 'main/exam/student-subject',
        permission: 'REGISTER_STUDENT_SUBJECT',
      },
      {
        name: 'Upload Result',
        type: 'link',
        icon: 'assessment',
        state: 'main/exam/upload-result',
        permission: 'UPLOAD_STUDENT_RESULTS',
      },
      {
        name: 'Register Teacher',
        type: 'link',
        icon: 'person_add',
        state: 'main/teacher/register-teacher',
        permission: 'REGISTER_TEACHER',
      },
      {
        name: 'Register Student',
        type: 'link',
        icon: 'group',
        state: 'main/student/register-student',
        permission: 'REGISTER_STUDENT',
      },
      {
        name: 'Student Performance',
        type: 'link',
        icon: 'assessment',
        state: 'main/exam/student-performance',
        permission: 'PUBLISH_RESULT',
      },
      {
        name: 'Profile',
        type: 'link',
        icon: 'person',
        state: 'main',
        permission: 'ALL_USERS',
      },
      {
        name: 'About',
        type: 'link',
        icon: 'info',
        state: 'main',
        permission: 'ALL_USERS',
      },
    ];
  }
}
