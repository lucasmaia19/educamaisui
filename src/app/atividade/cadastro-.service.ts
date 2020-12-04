import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  consultarListaFaixaEtaria(): Promise<any> {
      return this.http.get('http://localhost:8080/atividade/faixa-etaria')
      .toPromise()
      .then(response => {return response});
  }

  consultarListaCampoExperiencia(): Promise<any> {
    return this.http.get('http://localhost:8080/atividade/campo-experiencia')
    .toPromise()
    .then(response => {return response});
}

consultarListaFaixaEtariaFiltroId(id: any): Promise<any> {
    return this.http.get(`http://localhost:8080/atividade/aprendizagem-desenvolvimento/filter/faixa-etaria-id/${id}`)
    .toPromise()
    .then(response => {return response});
}

consultarCampoExperienciaFiltroId(id: any): Promise<any> {
    return this.http.get(`http://localhost:8080/atividade/aprendizagem-desenvolvimento/filter/campo-experiencia-id/${id}`)
    .toPromise()
    .then(response => {return response});
}

consultarCeFeFiltroId(id: any, idd: any): Promise<any> {
    return this.http.get(`http://localhost:8080/atividade/aprendizagem-desenvolvimento/filter/ce-fe-id/${id}/${idd}`)
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

}
