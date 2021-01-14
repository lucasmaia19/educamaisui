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

      // const multSelectList = new Array<any>();
      // Object.keys(dados).forEach(k => {

        //console.warn('for');
        //console.log('k', k);
        //console.log('dados[k]', dados[k]);
        //console.log('dados[k]', JSON.stringify({nome: dados[k]['nome'], id: dados[k]['id']}));

        // multSelectList.push(JSON.stringify({nome: dados[k]['nome'], id: dados[k]['id']}));

        //JSON.stringify({nome: dados[k]['nome'], id: dados[k]['id']});
        // formData.append(k, JSON.stringify({nome: dados[k]['nome'], id: dados[k]['id']}));

        //console.log(dados[k]['nome']);
        //console.log(dados[k]['id']);

        // formData.append(k, dados[k]);


        // formData.append('multSelect', multSelectList.toString());
        // console.log("formData", formData)
        // console.log("multSelectList", multSelectList)
    // });

        //const dados = this.multselect.nome
        //console.log("dados", dados)

        const formData = new FormData();
        const dados = JSON.stringify(this.multselect);
        formData.append('opcoes', dados);
        // formData.append('file', dados);

        this.http.post(this.apiuploadComDadosUrl, formData)
        .toPromise()
        .then(response => {
            console.log("dados selecionados", dados)
            console.log("response: ", response)
        })
    }
}
