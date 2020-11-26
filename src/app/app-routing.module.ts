import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AtividadeCadastroComponent } from './atividade-cadastro/atividade-cadastro.component';

const routes: Routes = [
  { path: 'atividade-cadastro', component: AtividadeCadastroComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
