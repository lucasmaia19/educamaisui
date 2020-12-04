import { CadastroService } from './../cadastro-.service';
import { Component, OnInit, ViewChild, ɵɵviewQuery } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';

export class Atividade {
    nome?: string;
    tag?: string;
    faixaEtaria?: string;
    campoExperiencia?: string;
    arquivo?: File;
}

export class FaixaEtaria {
    id?: number;
    codigo?: string;
    descricao?: string;
}

@Component({
    selector: 'app-atividade-cadastro',
    templateUrl: './atividade-cadastro.component.html',
    styleUrls: ['./atividade-cadastro.component.css']
})
export class AtividadeCadastroComponent implements OnInit {

    apiUploadUrl = 'http://localhost:8080/atividade/upload-com-dados';
    apiuploadComDadosUrl = 'http://localhost:8080/atividade/upload-com-dados';

    atividade = new Atividade();
    @ViewChild('arquivo') arquivo: FileUpload;

    // faixaEtariaList = new Array<SelectItem>();
    faixaEtariaList = new Array<any>();
    campoExperienciaList = new Array<any>();
    aprendizagemDesenvolvimento = new Array<any>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private cadastroService: CadastroService,
        ) {}

    ngOnInit(): void {
        this.atividade = { nome: 'Colorir', tag: 'Maternal' };

        this.cadastroService.consultarListaFaixaEtaria()
            .then(response => {
                for (var item of response) {
                    const dropDownItem = { label: '[' + item.codigo + '] ' + item.descricao, value: item.id }
                    this.faixaEtariaList.push(dropDownItem);
               }
        })

        this.cadastroService.consultarListaCampoExperiencia()
        .then(response => {
            for (var item of response) {
                const dropDownItem = { label: '[' + item.codigo + '] ' + item.descricao, value: item.id }
                this.campoExperienciaList.push(dropDownItem);
           }
      })
    }

    faixaEtariaAlterada() {
        console.log('faixaEtariaAlterada()');

        // Recupera a opção de faixa etaria.
        console.log("atividade.faixaEtaria", this.atividade.faixaEtaria);
        console.log("atividade.campoExperiencia", this.atividade.campoExperiencia);

        // Realizar uma requisição para a api usando a faixaEtaria como filtro

        if (this.atividade.faixaEtaria != null) {
        this.cadastroService.consultarListaFaixaEtariaFiltroId(this.atividade.faixaEtaria)
        .then(response =>
            {
                console.log(response)
                for (var item of response) {
                    const dropDownItem = { label: '[' + item.codigo + '] ' + item.descricao, value: item.id }
                    this.aprendizagemDesenvolvimento.push(dropDownItem)
                }
            }
        )
    }  if (this.atividade.campoExperiencia != null) {

        this.cadastroService.consultarCampoExperienciaFiltroId(this.atividade.campoExperiencia)
        .then(response =>
            {
                console.log(response)
                for (var item of response) {
                    const dropDownItem = { label: '[' + item.codigo + '] ' + item.descricao, value: item.id }
                    this.aprendizagemDesenvolvimento.push(dropDownItem)
                }
            })
        } if (this.atividade.campoExperiencia && this.atividade.faixaEtaria != null)

        this.cadastroService.consultarCeFeFiltroId(this.atividade.campoExperiencia, this.atividade.faixaEtaria)
        .then(response =>
            {
                console.log(response)
                for (var item of response) {
                    const dropDownItem = { label: '[' + item.codigo + '] ' + item.descricao, value: item.id }
                    this.aprendizagemDesenvolvimento.push(dropDownItem)
                }
            })
        // Recuperar a resposta e adicionar na lista de objetivos e aprendizagem

    }

    uploadComDados(): void {

        const formData = new FormData();

        const dados = this.atividade;
        Object.keys(dados).forEach(k => {
            formData.append(k, dados[k]);
        });

        const arquivo = this.arquivo._files[0];
        if (arquivo !== undefined) {
            formData.append('arquivo', arquivo);
        }

        this.http.post(this.apiuploadComDadosUrl, formData)
            .toPromise()
            .then(response => response);
            timeout(10000);
            // this.router.navigate(['']);
    }

}
