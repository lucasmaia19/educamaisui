import { Cabecalho } from './cabecalho-cadastrar/cabecalho.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CabecalhoService {

     constructor(private http: HttpClient) { }

     listaCabecalhos() {
        return this.http.get('http://localhost:8080/atividade/cabecalho')
            .toPromise()
            .then(data => { return data; });
    }

    deletarCabecalho(id: number): Promise<any> {
        return this.http.delete(`http://localhost:8080/atividade/cabecalho/${id}`)
            .toPromise()
            .then(response => {return response})
    }

    consultarIdCabecalho(id: number): Promise<Cabecalho> {
        return this.http.get(`http://localhost:8080/atividade/cabecalho/${id}`)
        .toPromise()
        .then(response => {
          const cadastro = response as Cabecalho

          return cadastro;
        });
    }

    atualizarCabecalho(cabecalho: Cabecalho): Promise<Cabecalho> {
        console.log("id service", cabecalho)
       return this.http.put(`http://localhost:8080/atividade/cabecalho/${cabecalho.id}`, cabecalho)
        .toPromise()
        .then(response => {

          const cabecalhoAtualizado = response as Cabecalho

          return cabecalhoAtualizado;
        });
      }
}
