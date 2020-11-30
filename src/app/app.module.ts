import { TesteService } from './atividade/teste/teste.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
import {DataViewModule} from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { TesteComponent } from './atividade/teste/teste.component';

const routes: Routes = [
    { path: '', component: AtividadePesquisaComponent },

    { path: 'atividade', component: AtividadeCadastroComponent },

    { path: 'ativade/:id', component: AtividadeCadastroComponent }
  ]

@NgModule({
  declarations: [
    AppComponent,
    AtividadeCadastroComponent,
    AtividadePesquisaComponent,
    NavbarComponent,
    TesteComponent,
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

    RouterModule.forRoot(routes)
  ],
  providers: [TesteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
