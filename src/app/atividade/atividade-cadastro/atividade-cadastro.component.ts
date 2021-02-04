import { CadastroService } from './../cadastro-.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export class MultSelecFe {
    nome?: string;
    code?: number;
}

export class MultSelecCe {
    nome?: string;
    code?: number;
}

export class MultSelecAd {
    nome?: string;
    code?: number;
}

export class Atividade {
    nome?: string;
    enunciado?: string;
    faixaEtaria?:  MultSelecFe[];
    campoExperiencia?: MultSelecFe[];
    aprendizagemDesenvolvimento?: MultSelecAd[];
    arquivo?: File;
}

export class Multselect {
    id?: string;
    nome?: string;
}

@Component({
    selector: 'app-atividade-cadastro',
    templateUrl: './atividade-cadastro.component.html',
    styleUrls: ['./atividade-cadastro.component.css']
})
export class AtividadeCadastroComponent implements OnInit {

    apiUploadUrl = 'https://educa-mais-api.herokuapp.com/atividade/upload-com-dados';
    apiuploadComDadosUrl = 'https://educa-mais-api.herokuapp.com/atividade/upload-com-dados';

    // apiUploadUrl = 'http://localhost:8080/atividade/upload-com-dados';
    // apiuploadComDadosUrl = 'http://localhost:8080/atividade/upload-com-dados';

    atividade = new Atividade();
    @ViewChild('arquivo') arquivo: FileUpload;

    atividades: any;

    requestProgress = false;

    faixaEtariaList = new Array<MultSelecFe>();
    campoExperienciaList = new Array<MultSelecCe>();
    aprendizagemDesenvolvimento = new Array<MultSelecAd>();

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private router: Router,
        private cadastroService: CadastroService,
        ) {}

    ngOnInit(): void {

        this.atividade = { nome: 'Colorir',
             enunciado: 'Ajude a Monica a chegar na flor! Passe o lápis nos caminhos até chegar na flor!' };

        this.consultarListaFaixaEtaria();
        this.consultarListaCampoExperiencia();
    }

    consultarListaCampoExperiencia() {
        this.cadastroService.consultarListaCampoExperiencia()
        .then(response => {
            for (var item of response) {
                const dropDownItem = { name: '[' + item.codigo + '] ' + item.descricao, code: item.id }
                this.campoExperienciaList.push(dropDownItem);
           }
        })
    }

    consultarListaFaixaEtaria() {
        this.cadastroService.consultarListaFaixaEtaria()
        .then(response => {
            for (var item of response) {
                const dropDownItem = { name: '[' + item.codigo + '] ' + item.descricao, code: item.id }
                this.faixaEtariaList.push(dropDownItem);
               }
         })
    }

    aprendizagemDesenvolvimentoAlterada() {

        this.aprendizagemDesenvolvimento = new Array<any>();

        if (this.atividade.campoExperiencia != undefined && this.atividade.faixaEtaria != undefined) {

            let idListFe = '';
            for (let item of this.atividade.faixaEtaria) {
                console.log(item.code);
                idListFe += item.code + ',';
            }
            idListFe = idListFe.replace(/,$/, '');
            console.warn('idListFe', idListFe);

            let idListCe = '';
            for(let item of this.atividade.campoExperiencia) {
                console.log("code ce", item.code);
                idListCe += item.code + ',';
            }
            idListCe = idListCe.replace(/,$/, '');
            console.warn('idListCe', idListCe);

            this.cadastroService.consultarCeFeFiltroId(idListCe, idListFe)
                .then(response =>
                    {
                        console.log(response)
                        for (var item of response) {
                            const dropDownItem = { name: '[' + item.codigo + '] ' + item.descricao, code: item.id }
                            this.aprendizagemDesenvolvimento.push(dropDownItem)
                        }
                    })

         } else if (this.atividade.campoExperiencia != undefined) {

            let idListCe = '';
            for(let item of this.atividade.campoExperiencia) {
                console.log("code ce", item.code);
                idListCe += item.code + ',';
            }
            idListCe = idListCe.replace(/,$/, '');
            console.warn('idListCe', idListCe);

            this.cadastroService.consultarCampoExperienciaFiltroId(idListCe)
            .then(response =>
                {
                        console.log(response)
                        for (var item of response) {
                            const dropDownItem = { name: '[' + item.codigo + '] ' + item.descricao, code: item.id }
                            this.aprendizagemDesenvolvimento.push(dropDownItem)
                        }
            })

        } else if (this.atividade.faixaEtaria != undefined) {

            console.log("this.atividade.faixaEtaria", this.atividade.faixaEtaria)

            let idListFe = '';
            for (let item of this.atividade.faixaEtaria) {
                console.log(item.code);
                idListFe += item.code + ',';
            }
            idListFe = idListFe.replace(/,$/, '');
            console.warn('idListFe', idListFe);

            this.cadastroService.consultarListaFaixaEtariaFiltroId(idListFe)
                .then(response =>
                    {
                        console.log(response)
                        for (var item of response) {
                            const dropDownItem = { name: '[' + item.codigo + '] ' + item.descricao, code: item.id }
                            this.aprendizagemDesenvolvimento.push(dropDownItem)
                        }
                    }
                )
        }

    }

    listaCadastros() {
        this.cadastroService.listaCadastros()
        .then(response => {
            this.atividades = response;
            console.log(this.atividades);
            // this.router.navigate([''])
        })
        .catch(erro => this.messageService.add({severity:'error', summary:'ERRO AO LISTAR'}))
            .finally(() => this.requestProgress = false);
    }

    uploadComDados() {

        let idListFe = '';
        for (let item of this.atividade.faixaEtaria) {
            console.log(item.code);
            idListFe += item.code + ',';
        }
        idListFe = idListFe.replace(/,$/, '');
       console.warn('idListFe', idListFe);

        let idListCe = '';
        for (let item of this.atividade.faixaEtaria) {
            console.log(item.code);
            idListCe += item.code + ',';
        }
        idListCe = idListCe.replace(/,$/, '');
        console.warn('idListCe', idListCe);


        let idListAd = '';
        for (let item of this.atividade.aprendizagemDesenvolvimento) {
            console.log(item.code);
            idListAd += item.code + ',';
        }
        idListAd = idListAd.replace(/,$/, '');
        console.warn('idListAd', idListAd);


        if (this.requestProgress) {
            return;
          }

        this.requestProgress = true;

        const formData = new FormData();

        const faixaEtariaOp = JSON.stringify(idListFe);
        formData.append('faixaEtariaOp', faixaEtariaOp);
        console.log("antes da req faixaEtariaOp", faixaEtariaOp)

        const campoExperienciaOp = JSON.stringify(idListCe);
        formData.append('campoExperienciaOp', campoExperienciaOp);
        console.log("antes da req campoExperienciaOp", campoExperienciaOp)

        const aprendizagemDesenvolvimentoOp = JSON.stringify(idListAd);
        formData.append('aprendizagemDesenvolvimentoOp', aprendizagemDesenvolvimentoOp);
        console.log("antes da req aprendizagemDesenvolvimentoOp", aprendizagemDesenvolvimentoOp)

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
            .then(response => {

                this.messageService.add({severity:'success', summary:'Cadastro adicionado com sucesso!'});

                this.listaCadastros();
                this.requestProgress = false;

                location.reload()

            })
            .catch(erro => this.messageService.add({severity:'error', summary:'ERRO AO CADASTRAR'}))
            .finally(() => this.requestProgress = false);
    }

}
