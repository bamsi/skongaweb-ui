import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private base_uri: string = `${environment.apiUrl}`;

  constructor(public _http: HttpClient) {}

  getStudentResultByUser(user_id: any): Observable<any> {
    return this._http.get(`${this.base_uri}/student_result/${user_id}`);
  }

  postParentFeedback(payload: any): Observable<any> {
    return this._http.post(`${this.base_uri}/parent_feedback`, payload);
  }

  /**
   * return list of subjects assigned to a teacher
   */
  getTeacherSubject(): Observable<any> {
    return this._http.get(`${this.base_uri}/teacher_subject`);
  }

  /**
   * return list of registered grades to a particular institution
   * @param institution_id
   * @returns
   */
  getGrade(institution_id: any): Observable<any> {
    return this._http.get(`${this.base_uri}/grade/${institution_id}`);
  }

  getRegisteredStudent(class_id: any, subject_id: any): Observable<any> {
    return this._http.get(
      `${this.base_uri}/registered_student_subject/${class_id}/${subject_id}`
    );
  }

  updateRegisteredStudentSubject(payload: any): Observable<any> {
    return this._http.post(
      `${this.base_uri}/update_registered_student`,
      payload
    );
  }
}
