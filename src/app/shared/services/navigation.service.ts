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
        name: 'Register Student',
        type: 'link',
        icon: 'person_add',
        state: 'main/exam/student-subject',
        permission: 'REGISTER_STUDENT_SUBJECT',
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
