import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private base_uri: string = `${environment.apiUrl}`;

  constructor(public _http: HttpClient) {}

  /**
   * return list of students
   * @param payload
   * @returns
   */
  getStudents(payload: any): Observable<any> {
    return this._http.get(
      `${this.base_uri}/students/${payload.institution_id}/${payload.class_id}/${payload.school_calendar_id}`
    );
  }

  importStudents(payload: any): Observable<any> {
    return this._http.post(`${this.base_uri}/import_students`, payload);
  }
}
