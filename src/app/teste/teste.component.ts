import { HttpClient } from '@angular/common/http';
import { CadastroService } from './../atividade/cadastro-.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

export class Multselect {
    id?: string;
    nome?: string;
}

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

    apiuploadComDadosUrl = 'http://localhost:8080/atividade/teste/';

    multselect = new Multselect();

    cities: any[];

  constructor(
    private http: HttpClient,
    private cadastroService: CadastroService,

  ) {
    this.cities = [
        { nome: "New York", id: "NY" },
        { nome: "Rome", id: "RM" },
        { nome: "London", id: "LDN" },
        { nome: "Istanbul", id: "IST" },
        { nome: "Paris", id: "PRS" }
      ];
   }

  ngOnInit(): void {
      console.log(this.cities)
  }

  teste() {
        const formData = new FormData();
        const dados = JSON.stringify(this.multselect);
        formData.append('opcoes', dados);
        // formData.append('file', dados);
        console.log("antes da req dadosCities", dados)

        this.http.post(this.apiuploadComDadosUrl, formData)
        .toPromise()
        .then(response => {
            console.log("dados selecionados", dados)
            console.log("response: ", response)
        })
    }
}
