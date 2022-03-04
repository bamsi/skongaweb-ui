import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LocalStoreService } from '../../../shared/services/ls.service';
import { Router } from '@angular/router';
import { JwtAuthService } from 'src/app/shared/services/jwt.auth.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public user!: any;
  public navItems: any;

  constructor(
    private observer: BreakpointObserver,
    private ls: LocalStoreService,
    private _route: Router,
    private _auth: JwtAuthService,
    private _navSvc: NavigationService,
    private permissionsService: NgxPermissionsService
  ) {
    this.navItems = _navSvc.getNavigation();
  }

  ngOnInit(): void {
    this.user = this.ls.getItem('APP_USER');
    const perm = this.user?.permissions.map((a: any) => a.name);
    this.permissionsService.loadPermissions(perm);
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

  navigateUrl(url: string) {
    this._route.navigate([url]);
  }

  logout() {
    this._auth.signout();
    this._route.navigateByUrl('/');
  }
}
