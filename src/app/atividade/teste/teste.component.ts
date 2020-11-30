import { TesteService } from './teste.service';
import { Cidade } from './cidade';
import { Pais } from './pais';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
//   styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {
paisSelecionado : Pais = new Pais(0,'Brasil') ;
paises: Pais[];
cidades: Cidade[];

  constructor(private testeservice: TesteService) {
      this.paises = this.testeservice.getPaises();
   }

   onSelect(id) {
       this.cidades = this.testeservice.getCidades().filter((item) => item.paisid == id);
   }

  ngOnInit(): void {
  }

}
