import { Cabecalho } from './../cabecalho-cadastrar/cabecalho.component';
import { FileUpload } from 'primeng/fileupload';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { CabecalhoService } from './../cabecalho.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-gerenciar-cabecalho',
  templateUrl: './gerenciar-cabecalho.component.html',
  styleUrls: ['./gerenciar-cabecalho.component.css']
})
export class GerenciarCabecalhoComponent implements OnInit {

    // apiUploadUrl = 'https://educa-mais-api.herokuapp.com/cabecalho/upload-com-dados-cabecalho';
    // apiuploadComDadosUrl = 'https://educa-mais-api.herokuapp.com/cabecalho/upload-com-dados-cabecalho';

    apiUploadUrl = 'http://localhost:8080/atividade/upload-com-dados-cabecalho';
    apiuploadComDadosUrl = 'http://localhost:8080/atividade/upload-com-dados-cabecalho';

    @ViewChild('logoPrefeitura') logoPrefeitura: FileUpload;
    @ViewChild('logoEscola') logoEscola: FileUpload;

    productDialog: boolean;

    cabecalhoList: any[];

    cabecalho: any;

    product: any;

    selectedProducts: any[];

    submitted: boolean;

    pt:any;

  constructor(
        private cabecalhoService: CabecalhoService,
        private sanitizer: DomSanitizer,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private http: HttpClient,
  ) { }

  ngOnInit(): void {

    this.pt = {
        firstDayOfWeek: 1,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
                        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Limpar'
        };

    this.listaCabecalhos();

  }

    get editando() {
        return Boolean(this.cabecalho.id)
    }

    salvar(form: FormControl) {
        if (this.editando) {
        this.atualizarCabecalho(form);
        } else {
        this.adicionarCabecalho(form);
        }
    }

    toLowerCase() {

    }

    consultarIdCabecalho(id: number) {
        this.productDialog = true;
        console.log("consultaIdCabecalho")
        // this.cabecalho = {}
        this.productDialog = true;

        this.cabecalhoService.consultarIdCabecalho(id)
            .then(cabecalho => {
                console.log(cabecalho)
                this.cabecalho = cabecalho;
            })
    }

    atualizarCabecalho(form: FormControl) {
        this.cabecalhoService.atualizarCabecalho(this.cabecalho)
      .then(() => {
        this.messageService.add({severity:'success', summary:'Cadastro Atualizado com Sucesso!'});
      });
    }

    hideDialog() {
        console.log("fechar")
        this.productDialog = false;
        this.submitted = false;
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    adicionarCabecalho(form: FormControl) {

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
    }

    listaCabecalhos() {
        this.cabecalhoService.listaCabecalhos()
        .then(response => {
            this.cabecalho = response;
            console.log("resposta", response);
        })
    }

    converteImagemBase64ParaHtml(imagem: any) {
        let novaImagem;
        novaImagem = "data:image/jpg;base64," + imagem + "";
        novaImagem = this.sanitizer.bypassSecurityTrustUrl(novaImagem);

        return novaImagem;
    }

    // deletarCabecalho(id: number) {
    //     this.confirmationService.confirm({
    //     message: 'Tem certeza que deseja excluir',
    //     accept: () => {
    //     this.cabecalhoService.deletarCabecalho(id)
    //         .then(response => {
    //             this.messageService.add({severity:'success', summary: ('Cadastro excluido com sucesso')})
    //             console.log("Id " + id + " excluido" )
    //             this.listaCabecalhos
    //             });
    //         }
    //     })
    // }

    deletarCabecalho(id: number) {

        this.cabecalhoService.deletarCabecalho(id)
        .then(response => {
            this.messageService.add({severity:'success', summary: ('Cadastro excluido com sucesso')})
            console.log("Id " + id + " excluido" )
            this.listaCabecalhos
            });
        }

    editProduct(id: number) {
        this.productDialog = true;
        this.consultarIdCabecalho(id)
    }
}
