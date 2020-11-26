import { CadastroService } from './../cadastro-.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pesquisaatividade',
  templateUrl: './atividade-pesquisa.component.html',
  styleUrls: ['./atividade-pesquisa.component.css']
})
export class AtividadePesquisaComponent implements OnInit {

  //atividades: Atividade[];
  //atividades = new Array<Atividade>();
  atividades: any;

  constructor(
    private service: CadastroService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.service.listaCadastros()
      .then(response => {
        this.atividades = response;
        console.log(this.atividades);
      })
  }

  converteImagemBase64ParaHtml(imagem: any) {

    // <img [src]="'data:image/jpg;base64," + {{ atividade.atividade }} + "'"/>

    let novaImagem;

    // novaImagem = this.sanitizer.bypassSecurityTrustUrl(imagem);
    // novaImagem = "'data:image/jpg;base64," + novaImagem + "'";

    novaImagem = "data:image/jpg;base64," + imagem + "";
    novaImagem = this.sanitizer.bypassSecurityTrustUrl(novaImagem);

    return novaImagem;

  }

}
