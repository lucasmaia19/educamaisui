import { Atividade } from './../atividade-cadastro/atividade-cadastro.component';
import { CadastroService } from './../cadastro-.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pesquisaatividade',
  templateUrl: './atividade-pesquisa.component.html',
  styleUrls: ['./atividade-pesquisa.component.css']
})
export class AtividadePesquisaComponent implements OnInit {

    atividades: any;

  constructor(
    private cadastroService: CadastroService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.cadastroService.listaCadastros()
      .then(response => {
        this.atividades = response;
        console.log(this.atividades);
      })
  }

  converteImagemBase64ParaHtml(imagem: any) {
    let novaImagem;
    novaImagem = "data:image/jpg;base64," + imagem + "";
    novaImagem = this.sanitizer.bypassSecurityTrustUrl(novaImagem);

    return novaImagem;
  }

  gerarPDF(atividade: Atividade) {
      console.log("gerarPDF")
      console.log(atividade)
      this.cadastroService.gerarPDF(atividade)
       .then(response => {
           console.log(response);
           const fileURL = URL.createObjectURL(response);
           window.open(fileURL, '_blank');
        });
  }
}
