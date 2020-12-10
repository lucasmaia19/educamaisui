import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Component, OnInit, ViewChild } from '@angular/core';

export class Cabecalho {
    professora?: string;
    turma?: string;
    data?: string;
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

  apiUploadUrl = 'http://localhost:8080/atividade/upload-com-dados-cabecalho';
  apiuploadComDadosUrl = 'http://localhost:8080/atividade/upload-com-dados-cabecalho';

  cabecalho = new Cabecalho();
  @ViewChild('logoPrefeitura') logoPrefeitura: FileUpload;
  @ViewChild('logoEscola') logoEscola: FileUpload;

  requestProgress = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  pt: any;

  ngOnInit(): void {

    this.cabecalho = { professora: 'Flavia',
                        aluno: 'Lucas',
                        data: '19/03/2021',
                        turma: 'Turma B',
                        nomeEscola: 'IFTM',
                        logradouro: 'Fazenda capim branco',
                        tel: '32262292',
                        cep: '38401591',
                        email: 'lucasmaia@gmail.com',
                    };

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

  }

  uploadComDadosCabecalho(): void {

    if (this.requestProgress) {
        return;
      }

    this.requestProgress = true;

    const formData = new FormData();

    const dados = this.cabecalho;
    Object.keys(dados).forEach(k => {
        formData.append(k, dados[k]);
    });

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
        .then(response => {
        this.messageService.add({severity:'success', summary:'Cadastro adicionado com sucesso!'});
        console.log("dados:", this.cabecalho)

        this.requestProgress = false;
    })
}

}
