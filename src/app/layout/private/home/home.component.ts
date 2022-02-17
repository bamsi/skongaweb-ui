import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LocalStoreService } from '../../../shared/services/ls.service'
import { Router } from '@angular/router';
import { JwtAuthService } from 'src/app/shared/services/jwt.auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public user!: any;

  constructor(
    private observer: BreakpointObserver,
    private ls: LocalStoreService,
    private _route: Router,
    private _auth: JwtAuthService
    ) { }

  ngOnInit(): void {
    this.user = this.ls.getItem('APP_USER');
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  navigateUrl(url: string){
     switch(url) {
       case 'student-result': {
        this._route.navigate(['main/exam/student-result']);
        break;
       }

       default: {
        this._route.navigate(['main']);
        break;
       }
     }
  }

  logout(){
    this._auth.signout();
    this._route.navigateByUrl('/');
  }

}
