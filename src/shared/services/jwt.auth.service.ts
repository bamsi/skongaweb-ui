import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError, delay } from "rxjs/operators";
import { login } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { LocalStoreService } from './ls.service';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {

  JWT_TOKEN = "JWT_TOKEN";
  token: any;

  constructor(
    public _authSvc: AuthService,
    public _ls: LocalStoreService
  ) { }

  signin(payload: login){
    return this._authSvc.login(payload)
      .pipe(
        map((response: any) => {
          this.setUserAndToken(response.token, response.user);
          return response;
        }),
        ((error) => {
          return error;
        })
      );
  }

  signout(){
     this.setUserAndToken(null, null);
  }

  setUserAndToken(token: any, user: any){
      this.token = token;
      this._ls.setItem('JWT_TOKEN', token);
      this._ls.setItem('APP_USER', user);
  }

  getJwtToken() {
    return this._ls.getItem(this.JWT_TOKEN);
  }

}

