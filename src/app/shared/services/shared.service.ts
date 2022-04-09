import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private base_uri: string = `${environment.apiUrl}`;

  constructor(public _http: HttpClient) {}

  getSubject() {
    return this._http.get(`${this.base_uri}/subject`);
  }

  /**
   * return list of registered grades to a particular institution
   * @param institution_id
   * @returns
   */
  getGrade(institution_id: any): Observable<any> {
    return this._http.get(`${this.base_uri}/grade/${institution_id}`);
  }

  getSchoolCalendar(institution_id: any): Observable<any> {
    return this._http.get(`${this.base_uri}/school_calendar/${institution_id}`);
  }
}
