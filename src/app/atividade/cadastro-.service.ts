import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
        return this.http.post('http://localhost:8080/atividade/gerarPDF/', atividade)
            .toPromise()
            .then(response => {return response})
    }
}
