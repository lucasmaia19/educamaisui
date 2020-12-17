import { DomSanitizer } from '@angular/platform-browser';
import { CabecalhoService } from './../cabecalho.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciar-cabecalho',
  templateUrl: './gerenciar-cabecalho.component.html',
  styleUrls: ['./gerenciar-cabecalho.component.css']
})
export class GerenciarCabecalhoComponent implements OnInit {

    productDialog: boolean;

    cabecalhoList: any[];

    cabecalho: any;

    product: any;

    selectedProducts: any[];

    submitted: boolean;

  constructor(
        private cabecalhoService: CabecalhoService,
        private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {

    this.listaCabecalhos();

  }

  toLowerCase() {

  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {

  }

  editProduct() {

  }

  deleteProduct() {

  }

  hideDialog() {

  }

  saveProduct() {

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

}
