import { FaixaEtaria } from './model/faixaEtaria';
import { Cidade } from './teste/cidade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CampoEx } from './model/campoEx';
import { OAD } from './model/oad';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  consultar(): Promise<any> {
    return this.http.get('http://localhost:8080/atvidade/')
    .toPromise()
    .then(response => {return response});
  }

  listaCadastros() {
    return this.http.get('http://localhost:8080/atividade/')
      .toPromise()
      .then(data => { return data; });
    }

    gerarPDF(atividade: any) {

        console.log("gerarPDF service")
        console.log(atividade)
        console.log(atividade.id)

        const url = `http://localhost:8080/atividade/gerar-pdf/${atividade.id}`;
        console.log(url)

        return this.http.get(url, { responseType: 'blob' })
            .toPromise()
            .then(response => {return response})
    }

    getFaixaEtaria() {
        return [
            new FaixaEtaria(1, 'Brasil' ),
            new FaixaEtaria(2, 'USA' ),
            new FaixaEtaria(3, 'Itália' )
           ];
    }

    getCampoEx() {

        return [
            new CampoEx(1, 'Brasil' ),
            new CampoEx(2, 'USA' ),
            new CampoEx(3, 'Itália' )
           ];
    }

    getOAD() {
        return [
            new OAD(1, 1, 1, 'São Paulo' ),
            new OAD(1, 1, 1, 'São Paulo' ),
            new OAD(1, 1, 1, 'São Paulo' ),
            new OAD(1, 1, 1, 'São Paulo' ),
        ];
    }


}
