import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { AtividadePesquisaComponent } from './atividade/atividade-pesquisa/atividade-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AtividadeCadastroComponent } from './atividade/atividade-cadastro/atividade-cadastro.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';

import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import {MenubarModule} from 'primeng/menubar';

const routes: Routes = [
    { path: '', component: AtividadePesquisaComponent },

    { path: 'atividade', component: AtividadeCadastroComponent },

    { path: 'cabecalho', component: CabecalhoComponent },

    { path: 'ativade/:id', component: AtividadeCadastroComponent }

  ]

@NgModule({
  declarations: [
    AppComponent,
    AtividadeCadastroComponent,
    AtividadePesquisaComponent,
    CabecalhoComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,

    InputTextModule,
    FileUploadModule,
    FieldsetModule,
    CardModule,
    PanelModule,
    ButtonModule,
    DataViewModule,
    DropdownModule,
    InputTextareaModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressBarModule,
    CalendarModule,
    MenubarModule,

    RouterModule.forRoot(routes)
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
