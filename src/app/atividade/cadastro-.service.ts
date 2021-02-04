import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    urlBase = environment.urlBase;

    constructor(private http: HttpClient) { }

    gerarPDF(atividade: any, cabecalho: any) {

        const url = this.urlBase + `atividade/gerar-pdf/${atividade.id}/${cabecalho.id}`;
        return this.http.get(url, { responseType: 'blob' })
            .toPromise()
            .then(response => {return response})
    }

    consultarListaFaixaEtaria(): Promise<any> {

        return this.http.get(this.urlBase + 'atividade/faixa-etaria')
            .toPromise()
            .then(response => {return response});
    }

    consultarListaCampoExperiencia(): Promise<any> {

        return this.http.get(this.urlBase + 'atividade/campo-experiencia')
            .toPromise()
            .then(response => {return response});
    }

    listaCadastros() {

        return this.http.get(this.urlBase + 'atividade/')
            .toPromise()
            .then(data => { return data; });
        }

    deletarCadastro(id: number): Promise<any> {

        return this.http.delete(this.urlBase + `atividade/${id}`)
            .toPromise()
            .then(response => {return response})
    }

    consultarListaFaixaEtariaFiltroId(idList: string): Promise<any> {

        let faixaEtariaIdList = `faixaEtariaIdList=${idList}`;
        return this.http.get(this.urlBase + `atividade/aprendizagem-desenvolvimento/filter/faixa-etaria-id-list?${faixaEtariaIdList}`)
            .toPromise()
            .then(response => {return response});
    }

    consultarCampoExperienciaFiltroId(idList: string): Promise<any> {

        let campoExperienciaIdList = `campoExperienciaIdList=${idList}`;
        return this.http.get(this.urlBase + `atividade/aprendizagem-desenvolvimento/filter/campo-experiencia-id-list?${campoExperienciaIdList}`)
            .toPromise()
            .then(response => {return response});
    }

    consultarCeFeFiltroId(idListCe: string, idListFe: string): Promise<any> {

        let campoExfaixaEt = `campoExperienciaIdList=${idListCe}&faixaEtariaIdList=${idListFe}`
        return this.http.get(this.urlBase + `atividade/aprendizagem-desenvolvimento/filter/ce-fe-id-list?${campoExfaixaEt}`)
            .toPromise()
            .then(response => {return response});
    }
}
