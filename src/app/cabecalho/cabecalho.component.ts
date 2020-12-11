import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

export class Cabecalho {
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
                        turma: 'Turma B',
                        nomeEscola: 'IFTM',
                        logradouro: 'Fazenda capim branco',
                        tel: '32262292',
                        cep: '38401591',
                        data: new Date(),
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

        console.log(this.cabecalho.data)

        let data = moment(this.cabecalho.data, "DDMMYYYY");
        console.log(data);

        const dataFormatada = data.format("YYYY-MM-DD");
        console.log(dataFormatada);

        this.cabecalho.data = data.toDate();

        // console.info("data tipo Moment " + data.format("DD/MM/YYYY"));
        // data.format("DD/MM/YYYY")

        // return;




        console.log(this.cabecalho.data)

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
        .then(cabecalho => {
            console.log(cabecalho)
            this.messageService.add({severity:'success', summary:'Cadastro adicionado com sucesso!'});
        })

        this.requestProgress = false;
    }

}
