import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelMenuModule } from 'primeng/panelmenu';

const prime_modules = [
  InputTextModule,
  ButtonModule,
  DropdownModule,
  CardModule,
  TableModule,
  InputNumberModule,
  ToastModule,
  DialogModule,
  RadioButtonModule,
  CheckboxModule,
  TabViewModule,
  FileUploadModule,
  TooltipModule,
  InputTextareaModule,
  ConfirmDialogModule,
  MessagesModule,
  MessageModule,
  PanelMenuModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, prime_modules],
  exports: [prime_modules],
})
export class PrimengModule {}
