import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    constructor(private http: HttpClient) { }

    consultarListaFaixaEtaria(): Promise<any> {
        return this.http.get('https://educa-mais-api.herokuapp.com/faixa-etaria')
            .toPromise()
            .then(response => {return response});
    }

    consultarListaCampoExperiencia(): Promise<any> {
        return this.http.get('https://educa-mais-api.herokuapp.com/campo-experiencia')
            .toPromise()
            .then(response => {return response});
    }

    consultarListaFaixaEtariaFiltroId(id: any): Promise<any> {
        return this.http.get(`https://educa-mais-api.herokuapp.com/atividade/aprendizagem-desenvolvimento/filter/faixa-etaria-id/${id}`)
            .toPromise()
            .then(response => {return response});
    }

    consultarCampoExperienciaFiltroId(id: any): Promise<any> {
        return this.http.get(`https://educa-mais-api.herokuapp.com/atividade/aprendizagem-desenvolvimento/filter/campo-experiencia-id/${id}`)
            .toPromise()
            .then(response => {return response});
    }

    consultarCeFeFiltroId(id: any, idd: any): Promise<any> {
        return this.http.get(`https://educa-mais-api.herokuapp.com/atividade/aprendizagem-desenvolvimento/filter/ce-fe-id/${id}/${idd}`)
            .toPromise()
            .then(response => {return response});
    }

    listaCadastros() {
        return this.http.get('https://educa-mais-api.herokuapp.com/atividade/')
            .toPromise()
            .then(data => { return data; });
    }

    deletarCadastro(id: number): Promise<any> {
        return this.http.delete(`https://educa-mais-api.herokuapp.com/atividade/${id}`)
            .toPromise()
            .then(response => {return response})
    }

    gerarPDF(atividade: any, cabecalho: any) {

        console.log("gerarPDF service")
        console.log("atividade.id", atividade.id)
        console.log("cabecalho.id", cabecalho.id)

        const url = `https://educa-mais-api.herokuapp.com/atividade/gerar-pdf/${atividade.id}/${cabecalho.id}`;
        console.log(url)

        return this.http.get(url, { responseType: 'blob' })
            .toPromise()
            .then(response => {return response})
    }
}
