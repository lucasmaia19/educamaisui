import { MessageService } from 'primeng/api';
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

  constructor(
    private cadastroService: CadastroService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.listaCadastros();
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
        this.cadastroService.deletarCadastro(id)
        .then(response => {
            this.messageService.add({severity:'success', summary: ('Cadastro excluido com sucesso')})
            console.log("Id " + id + " excluido" )
            this.listaCadastros
        })
    }

    converteImagemBase64ParaHtml(imagem: any) {
        let novaImagem;
        novaImagem = "data:image/jpg;base64," + imagem + "";
        novaImagem = this.sanitizer.bypassSecurityTrustUrl(novaImagem);

        return novaImagem;
    }

    gerarPDF(atividade: Atividade) {
        this.messageService.add({severity:'info', summary: ('PDF Sendo Gerado. Aguarde!')})
        console.log("gerarPDF")
        console.log(atividade)
        this.cadastroService.gerarPDF(atividade)
        .then(response => {
            console.log(response);
            const fileURL = URL.createObjectURL(response);
            window.open(fileURL, '_blank');
        });
    }

    teste() {
        console.log("click")
        this.messageService.add({severity:'success', summary: ('Cadastro excluido com sucesso')})
    }
}
