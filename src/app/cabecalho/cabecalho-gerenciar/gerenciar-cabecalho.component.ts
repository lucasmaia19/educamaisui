import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciar-cabecalho',
  templateUrl: './gerenciar-cabecalho.component.html',
  styleUrls: ['./gerenciar-cabecalho.component.css']
})
export class GerenciarCabecalhoComponent implements OnInit {

    productDialog: boolean;

    products: any[];

    product: any;

    selectedProducts: any[];

    submitted: boolean;

  constructor() { }

  ngOnInit(): void {
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

}
