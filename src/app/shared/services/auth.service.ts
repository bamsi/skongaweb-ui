import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { login } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base_uri: string = `${environment.apiUrl}`;

  constructor(public _http: HttpClient) { }

  login(payload: login){
     return this._http.post(`${this.base_uri}/login`, payload);
  }
}
