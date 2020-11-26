import { AtividadeCadastroComponent } from './atividade/atividade-cadastro/atividade-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
