import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtAuthService } from '../../shared/services/jwt.auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public errorMessage: any;

  constructor(
    public _fb: FormBuilder, 
    public _auth: JwtAuthService,
    public _route: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(){
    return this._fb.group({
       username: ['', Validators.required],
       password: ['', Validators.required]
    });
  }
  
  login(){
    const payload = this.loginForm.value;
    this._auth.signin(payload).subscribe(
      (response)=>{
        this._route.navigateByUrl('main');
      }, 
      (error)=>{
        this.errorMessage = [{severity:'error', summary:'Error', detail: error.error.error}];
    });   
  }
}