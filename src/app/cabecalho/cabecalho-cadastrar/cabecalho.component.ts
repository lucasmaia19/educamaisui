import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CabecalhoService } from '../cabecalho.service';

export class Cabecalho {
    id?: number;
    professora?: string;
    turma?: string;
    data?: Date;
    aluno?: string;
    nomeEscola?: string;
    logradouro?: string;
    tel?: string;
    cep?: string;
    email?: string;
    logoPrefeitura?: File;
    logoEscola?: File;
}

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

//   apiUploadUrl = 'https://educa-mais-api.herokuapp.com/atividade/upload-com-dados-cabecalho';
//   apiuploadComDadosUrl = 'https://educa-mais-api.herokuapp.com/atividade/upload-com-dados-cabecalho';

  apiUploadUrl = 'http://localhost:8080/atividade/upload-com-dados-cabecalho';
  apiuploadComDadosUrl = 'http://localhost:8080/atividade/upload-com-dados-cabecalho';

  cabecalho = new Cabecalho();
  @ViewChild('logoPrefeitura') logoPrefeitura: FileUpload;
  @ViewChild('logoEscola') logoEscola: FileUpload;

  requestProgress = false;

  constructor(
    private http: HttpClient,
    private cabecalhoService: CabecalhoService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  pt: any;

  ngOnInit(): void {

    // this.listaCabecalhos()

      this.pt = {
        firstDayOfWeek: 0,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
                        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Limpar'
        }

    // this.cabecalho = {
    //     professora: 'Flavia',
    //     aluno: 'Lucas',
    //     turma: 'Turma B',
    //     nomeEscola: 'IFTM',
    //     logradouro: 'Fazenda capim branco',
    //     tel: '32262292',
    //     cep: '38401591',
    //     data: new Date(),
    //     email: 'lucasmaia@gmail.com',
    //     };
    }

    uploadComDadosCabecalho(): void {

        if (this.requestProgress) {
            return;
        }

        this.requestProgress = true;


        const formData = new FormData();

        console.warn(this.cabecalho.data)

        const dados = this.cabecalho;
        console.warn(dados)

        Object.keys(dados).forEach(item => {

            console.warn(item);
            console.info(dados[item]);

            if (dados[item] === undefined || dados[item] === null) {
                return;

            } else if (dados[item] instanceof Date) {
                let dataDummy1 = moment(this.cabecalho.data);
                console.log('dataDummy1', dataDummy1)
                let dataDummy2 = dataDummy1.format("YYYY-MM-DD");
                console.log('dataDummy2', dataDummy2);
                formData.append('data', dataDummy2);

            } else {
                formData.append(item, dados[item]);
            }

        });

        // formData.append('professora', this.cabecalho.professora);

        // let dataDummy1 = moment(this.cabecalho.data);
        // console.log('dataDummy1', dataDummy1)
        // let dataDummy2 = dataDummy1.format("YYYY-MM-DD");
        // console.log('dataDummy2', dataDummy2);
        // formData.append('data', dataDummy2);

        const logoPrefeitura = this.logoPrefeitura._files[0];
        if (logoPrefeitura !== undefined) {
            formData.append('logoPrefeitura', logoPrefeitura);
        }

        const logoEscola = this.logoEscola._files[0];
        if (logoEscola !== undefined) {
            formData.append('logoEscola', logoEscola);
        }

        this.http.post(this.apiuploadComDadosUrl, formData)
        .toPromise()
        .then(cabecalho => {
            console.log(cabecalho)
            this.messageService.add({severity:'success', summary:'Cabeçalho adicionado com sucesso!'});
        })

        this.requestProgress = false;
        this.router.navigate([''])
    }

    listaCabecalhos() {
        this.cabecalhoService.listaCabecalhos()
        .then(response => {
            this.cabecalho = response;
            console.log("resposta", response);
        })
    }
}
