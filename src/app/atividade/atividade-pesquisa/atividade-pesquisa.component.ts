import { CabecalhoService } from './../../cabecalho/cabecalho.service';
import { Cabecalho, CabecalhoComponent } from './../../cabecalho/cabecalho.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Atividade } from './../atividade-cadastro/atividade-cadastro.component';
import { CadastroService } from './../cadastro-.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pesquisaatividade',
  templateUrl: './atividade-pesquisa.component.html',
  styleUrls: ['./atividade-pesquisa.component.css']
})
export class AtividadePesquisaComponent implements OnInit {

    atividades: any;

    cabecalho: any;

    items: any;

    // cabecalho = Cabecalho[];

    selectedProduct: any;

    requestProgress = false;

    constructor(
        private cadastroService: CadastroService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cabecalhoService: CabecalhoService
    ) { }

  ngOnInit() {

    this.listaCabecalhos()
    this.listaCadastros();

        this.items = [
            {
                label: 'Nova Atividade',
                icon: 'pi pi-fw pi-plus',
                command: () => {
                    this.router.navigate(['atividade']);
                }
            },
            {
                label:'Cadastrar Cabeçalho',
                icon:'pi pi-fw pi-plus',
                command: () => {
                    this.router.navigate(['cabecalho']);
                }
            }
        ]
    }

    onRowSelect(event) {
        this.messageService.add({severity: 'info', summary: 'Cabeçalho Selecionado'});
    }

    listaCadastros() {
        this.cadastroService.listaCadastros()
        .then(response => {
            this.atividades = response;
            console.log(this.atividades);
            // this.router.navigate([''])
        })
    }

    deletarCadastro(id: number) {
        this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
        this.cadastroService.deletarCadastro(id)
        .then(response => {
            this.messageService.add({severity:'success', summary: ('Cadastro excluido com sucesso')})
            console.log("Id " + id + " excluido" )
            this.listaCadastros
            });
        }
    })
    }

    converteImagemBase64ParaHtml(imagem: any) {
        let novaImagem;
        novaImagem = "data:image/jpg;base64," + imagem + "";
        novaImagem = this.sanitizer.bypassSecurityTrustUrl(novaImagem);

        return novaImagem;
    }

    gerarPDF(atividade: Atividade) {

        if (this.requestProgress) {
            return;
          }

        this.requestProgress = true;
        this.messageService.add({severity:'info', summary: ('PDF Sendo Gerado. Aguarde!')})
        console.log("gerarPDF")
        console.log("atividade", atividade)
        this.cadastroService.gerarPDF(atividade)
        .then(response => {
            console.log(response);
            const fileURL = URL.createObjectURL(response);
            window.open(fileURL, '_blank');
            this.messageService.add({severity:'success', summary:'PDF Gerado'});
            this.requestProgress = false;
        });

        this.requestProgress = false;
    }

    listaCabecalhos() {
        this.cabecalhoService.listaCabecalhos()
        .then(response => {
            this.cabecalho = response;
            console.log("resposta", response);
        })
    }

    teste() {
        console.log("click")
        this.messageService.add({severity:'success', summary: ('Cadastro excluido com sucesso')})
    }
}
