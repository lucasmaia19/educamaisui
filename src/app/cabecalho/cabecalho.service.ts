import { environment } from './../../environments/environment';
import { Cabecalho } from './cabecalho-cadastrar/cabecalho.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CabecalhoService {

    urlBase = environment.urlBase;

     constructor(private http: HttpClient) { }

     listaCabecalhos() {
        return this.http.get(this.urlBase + 'cabecalho')
            .toPromise()
            .then(data => { return data; });
    }

    deletarCabecalho(id: number): Promise<any> {
        return this.http.delete(this.urlBase + `cabecalho/${id}`)
            .toPromise()
            .then(response => {return response})
    }

    consultarIdCabecalho(id: number): Promise<Cabecalho> {
        return this.http.get(this.urlBase + `cabecalho/${id}`)
        .toPromise()
        .then(response => {
          const cadastro = response as Cabecalho

          return cadastro;
        });
    }

    atualizarCabecalho(cabecalho: Cabecalho): Promise<Cabecalho> {
        console.log("id service", cabecalho)
       return this.http.put(this.urlBase + `cabecalho/${cabecalho.id}`, cabecalho)
        .toPromise()
        .then(response => {

          const cabecalhoAtualizado = response as Cabecalho

          return cabecalhoAtualizado;
        });
      }
}
