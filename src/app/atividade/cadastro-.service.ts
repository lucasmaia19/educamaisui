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
            new FaixaEtaria(4, 'Bebês (zero a 1 ano e 6 meses)'),
            new FaixaEtaria(5, 'Crianças pequenas (4 anos a 5 anos e 11 meses)'),
            new FaixaEtaria(6, 'Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)')
           ];
    }

    getCampoEx() {

        return [
            new CampoEx(7, 'Traços, sons, cores e formas'),
            new CampoEx(8, 'O eu, o outro e o nós'),
            new CampoEx(9, 'Corpo, gestos e movimentos'),
            new CampoEx(10, 'Escuta, fala, pensamento e imaginação'),
            new CampoEx(11, 'Espaços, tempos, quantidades, relações e transformações')
           ];
    }

    getOAD() {
        return [

            // new OAD(1, 4, 7, 'Lucas'),
            // new OAD(2, 4, 8, 'Joao'),
            // new OAD(3, 6, 9, 'Caio'),
            // new OAD(4, 6, 9, 'Caio'),
            new OAD(5, 6, 9, 'Caio'),
            new OAD(6, 4, 9, 'Cele'),
            // new OAD(7, 5, 10, 'Matheus'),
            // new OAD(8, 5, 11, 'Alves')

            // new OAD(1, 4, 7, 'EI01TS01'),
            // new OAD(2, 4, 7, 'EI01TS02'),
            // new OAD(3, 4, 7, 'EI01TS03'),
            // new OAD(4, 4, 8, 'EI01EO01'),
            // new OAD(5, 4, 8, 'EI01EO02'),
            // new OAD(6, 4, 8, 'EI01EO03'),
            // new OAD(7, 4, 8, 'EI01EO04'),
            // new OAD(8, 4, 8, 'EI01EO05'),
            // new OAD(9, 4, 8, 'EI01EO06'),
            // new OAD(10, 4, 8, 'EI01EO07'),
            // new OAD(11, 4, 9, 'EI03CG01'),
            // new OAD(12, 4, 9, 'EI03CG02'),
            // new OAD(13, 4, 9, 'EI03CG03'),
            // new OAD(14, 4, 9, 'EI03CG04'),
            // new OAD(15, 4, 9, 'EI03CG05'),
            // new OAD(16, 4, 10, 'EI01EF01'),
            // new OAD(17, 4, 10, 'EI01EF02'),
            // new OAD(18, 4, 10, 'EI01EF03'),
            // new OAD(19, 4, 10, 'EI01EF04'),
            // new OAD(20, 4, 10, 'EI01EF05'),
            // new OAD(21, 4, 10, 'EI01EF06'),
            // new OAD(22, 4, 10, 'EI01EF07'),
            // new OAD(23, 4, 10, 'EI01EF08'),
            // new OAD(24, 4, 10, 'EI01EF09'),
            // new OAD(25, 4, 11, 'EI01ET01'),
            // new OAD(26, 4, 11, 'EI01ET02'),
            // new OAD(27, 4, 11, 'EI01ET03'),
            // new OAD(28, 4, 11, 'EI01ET04'),
            // new OAD(29, 4, 11, 'EI01ET05'),
            // new OAD(30, 4, 11, 'EI01ET06'),

            // new OAD(31, 5, 7, 'EI02ET01'),
            // new OAD(32, 5, 7, 'EI02TS02'),
            // new OAD(33, 5, 7, 'EI02TS03'),

            // new OAD(34, 5, 8, 'EI02EO01'),

        ];
    }


}
