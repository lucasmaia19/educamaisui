import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    // urlBase = "https://educa-mais-api.herokuapp.com/";
    //urlBase = "http://localhost:8080/";
    urlBase = environment.urlBase;

    // urlBase = "https://educa-mais-api.herokuapp.com/"

//    this.environment.urlBase;

    //environment = environment;

    constructor(private http: HttpClient) { }

    gerarPDF(atividade: any, cabecalho: any) {

        console.log("gerarPDF service")
        console.log("atividade.id", atividade.id)
        console.log("cabecalho.id", cabecalho.id)

        // const url = `https://educa-mais-api.herokuapp.com/atividade/gerar-pdf/${atividade.id}/${cabecalho.id}`;
        // const url = `http://localhost:8080/atividade/gerar-pdf/${atividade.id}/${cabecalho.id}`;
        const url = this.urlBase + `atividade/gerar-pdf/${atividade.id}/${cabecalho.id}`;


        //const url = this.environment.urlBase + `atividade/gerar-pdf/${atividade.id}/${cabecalho.id}`;

        //this.environment.urlBase

        console.log(url)

        return this.http.get(url, { responseType: 'blob' })
            .toPromise()
            .then(response => {return response})
    }

    consultarListaFaixaEtaria(): Promise<any> {
        // return this.http.get('https://educa-mais-api.herokuapp.com/atividade/faixa-etaria')
        // return this.http.get('http://localhost:8080/atividade/faixa-etaria')
        return this.http.get(this.urlBase + 'atividade/faixa-etaria')
            .toPromise()
            .then(response => {return response});
    }

    consultarListaCampoExperiencia(): Promise<any> {
        // return this.http.get('https://educa-mais-api.herokuapp.com/atividade/campo-experiencia')
        // return this.http.get('http://localhost:8080/atividade/campo-experiencia')
        return this.http.get(this.urlBase + 'atividade/campo-experiencia')
            .toPromise()
            .then(response => {return response});
    }

    consultarListaFaixaEtariaFiltroId(idList: any): Promise<any> {

        let faixaEtariaIdList = `faixaEtariaIdList=${idList}`;

        return this.http.get(this.urlBase + `atividade/aprendizagem-desenvolvimento/filter/faixa-etaria-id-list?${faixaEtariaIdList}`)
            .toPromise()
            .then(response => {return response});
    }

    consultarCampoExperienciaFiltroId(idList: any): Promise<any> {

        let campoExperienciaIdList = `campoExperienciaIdList=${idList}`;

        return this.http.get(this.urlBase + `atividade/aprendizagem-desenvolvimento/filter/campo-experiencia-id-list?${campoExperienciaIdList}`)

            .toPromise()
            .then(response => {return response});
    }

    consultarCeFeFiltroId(id: any, idd: any): Promise<any> {
        // return this.http.get(`https://educa-mais-api.herokuapp.com/atividade/aprendizagem-desenvolvimento/filter/ce-fe-id/${id}/${idd}`)
        // return this.http.get(`http://localhost:8080/atividade/aprendizagem-desenvolvimento/filter/ce-fe-id/${id}/${idd}`)
        return this.http.get(this.urlBase + `atividade/aprendizagem-desenvolvimento/filter/ce-fe-id/${id}/${idd}`)
            .toPromise()
            .then(response => {return response});
    }

    listaCadastros() {
        // return this.http.get('https://educa-mais-api.herokuapp.com/atividade/')
        // return this.http.get('http://localhost:8080/atividade/')
        return this.http.get(this.urlBase + 'atividade/')
            .toPromise()
            .then(data => { return data; });
    }

    deletarCadastro(id: number): Promise<any> {
        // return this.http.delete(`https://educa-mais-api.herokuapp.com/atividade/${id}`)
        // return this.http.delete(`http://localhost:8080/atividade/${id}`)
        return this.http.delete(this.urlBase + `atividade/${id}`)
            .toPromise()
            .then(response => {return response})
    }

}
