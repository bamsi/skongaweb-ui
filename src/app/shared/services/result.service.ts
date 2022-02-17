import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private base_uri: string = `${environment.apiUrl}`;

  constructor(public _http: HttpClient) { }

  getStudentResultByUser(user_id: any):Observable<any>{
    return this._http.get(`${this.base_uri}/student_result/${user_id}`);
  }

  postParentFeedback(payload: any){
    return this._http.post(`${this.base_uri}/parent_feedback`, payload);
  }
}
