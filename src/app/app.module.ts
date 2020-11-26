import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AtividadeCadastroComponent } from './atividade-cadastro/atividade-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    AtividadeCadastroComponent
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

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
