import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private base_uri: string = `${environment.apiUrl}`;

  constructor(public _http: HttpClient) {}

  getRegisteredTeacher(institution_id: any) {
    return this._http.get(`${this.base_uri}/teacher/${institution_id}`);
  }

  /**
   * return list of subjects assigned to a teacher
   */
  getTeacherSubject(): Observable<any> {
    return this._http.get(`${this.base_uri}/teacher_subject`);
  }

  registerTeacher(payload: any): Observable<any> {
    return this._http.post(`${this.base_uri}/register_teacher`, payload);
  }

  updateTeacher(payload: any) {
    return this._http.post(`${this.base_uri}/update_teacher`, payload);
  }

  teacherSubjectAssigned(id: any): Observable<any> {
    return this._http.get(`${this.base_uri}/teacher_subject/${id}`);
  }

  assignTeacherSubject(payload: any): Observable<any> {
    return this._http.post(`${this.base_uri}/assign_teacher_subject`, payload);
  }
}
