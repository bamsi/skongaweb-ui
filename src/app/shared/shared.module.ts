import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from './primeng/primeng.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { LogoComponent } from './logo/logo.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [LogoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    NgxPermissionsModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    NgxPermissionsModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
})
export class SharedModule {}
