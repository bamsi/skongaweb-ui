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

  /*** get current exams list */
  getCurrentExams(institution_id: any): Observable<any> {
    return this._http.get(`${this.base_uri}/current_exam/${institution_id}`);
  }

  /** get list of  */
  getTeacherClass(subject_id: any): Observable<any> {
    return this._http.get(`${this.base_uri}/teacher_grade/${subject_id}`);
  }

  /** get student results by class id */
  getStudentResult(payload: any): Observable<any> {
    return this._http.post(`${this.base_uri}/student_result`, payload);
  }

  /** update student result */
  submitResult(payload: any): Observable<any> {
    return this._http.post(`${this.base_uri}/update_student_result`, payload);
  }

  /**
   * post students performance
   * @param payload
   * @returns
   */
  savePerformance(payload: any): Observable<any> {
    return this._http.post<any>(`${this.base_uri}/performance`, payload);
  }

  /**
   * post performance comment
   * @param payload
   * @returns
   */
  savePerformanceComment(payload: any): Observable<any> {
    return this._http.post<any>(
      `${this.base_uri}/performance_comment`,
      payload
    );
  }

  getPerformance(payload: any): Observable<any> {
    return this._http.get<any>(
      `${this.base_uri}/performance/${payload.class_id}/${payload.student_id}/${payload.term_id}`
    );
  }

  getComment(payload: any): Observable<any> {
    return this._http.get<any>(
      `${this.base_uri}/performance_comment/${payload.class_id}/${payload.student_id}/${payload.term_id}`
    );
  }
}
