import { CadastroService } from './../cadastro-.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export class Atividade {
    nome?: string;
    enunciado?: string;
    faixaEtaria?: string;
    campoExperiencia?: string;
    aprendizagemDesenvolvimento?: string;
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

    // apiUploadUrl = 'https://educa-mais-api.herokuapp.com/atividade/upload-com-dados';
    // apiuploadComDadosUrl = 'https://educa-mais-api.herokuapp.com/atividade/upload-com-dados';

    apiUploadUrl = 'http://localhost:8080/atividade/upload-com-dados';
    apiuploadComDadosUrl = 'http://localhost:8080/atividade/upload-com-dados';

    atividade = new Atividade();
    @ViewChild('arquivo') arquivo: FileUpload;

    atividades: any;

    multselect = new Multselect();

    cities: any[];

    requestProgress = false;

    faixaEtariaList = new Array<any>();
    campoExperienciaList = new Array<any>();
    aprendizagemDesenvolvimento = new Array<any>();

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private router: Router,
        private cadastroService: CadastroService,
        ) {
            this.cities = [
                { nome: "New York", id: "NY" },
                { nome: "Rome", id: "RM" },
                { nome: "London", id: "LDN" },
                { nome: "Istanbul", id: "IST" },
                { nome: "Paris", id: "PRS" }
              ];
        }

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
                const dropDownItem = { label: '[' + item.codigo + '] ' + item.descricao, value: item.id }
                this.campoExperienciaList.push(dropDownItem);
           }
        })
    }

    consultarListaFaixaEtaria() {
        this.cadastroService.consultarListaFaixaEtaria()
        .then(response => {
            for (var item of response) {
                const dropDownItem = { label: '[' + item.codigo + '] ' + item.descricao, value: item.id }
                this.faixaEtariaList.push(dropDownItem);
               }
         })
    }

    aprendizagemDesenvolvimentoAlterada() {

        console.log('faixaEtariaAlterada()');
        this.aprendizagemDesenvolvimento = new Array<any>();

        // Recupera a opção de faixa etaria.
        // console.log("atividade.faixaEtaria", this.atividade.faixaEtaria);
        // console.log("atividade.campoExperiencia", this.atividade.campoExperiencia);
        console.log("antes da alteracao: this.aprendizagemDesenvolvimento", this.aprendizagemDesenvolvimento);

        // Realizar uma requisição para a api usando a faixaEtaria como filtro

        if (this.atividade.campoExperiencia != undefined && this.atividade.faixaEtaria != undefined) {

            // console.log('this.atividade.campoExperiencia != undefined && this.atividade.faixaEtaria != undefined');

            this.cadastroService.consultarCeFeFiltroId(this.atividade.campoExperiencia, this.atividade.faixaEtaria)
                .then(response =>
                    {
                        console.log(response)
                        for (var item of response) {
                            const dropDownItem = { label: '[' + item.codigo + '] ' + item.descricao, value: item.id }
                            this.aprendizagemDesenvolvimento.push(dropDownItem)
                        }
                    })

        } else if (this.atividade.campoExperiencia != undefined) {

            // console.log('this.atividade.campoExperiencia != undefined');

            this.cadastroService.consultarCampoExperienciaFiltroId(this.atividade.campoExperiencia)
                .then(response =>
                    {
                        console.log(response)
                        for (var item of response) {
                            const dropDownItem = { label: '[' + item.codigo + '] ' + item.descricao, value: item.id }
                            this.aprendizagemDesenvolvimento.push(dropDownItem)
                        }
                    })

        } else if (this.atividade.faixaEtaria != undefined) {

            // console.log('dentro de this.atividade.faixaEtaria != undefined');

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
        }

        console.log("depois da alteracao: this.aprendizagemDesenvolvimento", this.aprendizagemDesenvolvimento);

        // Recuperar a resposta e adicionar na lista de objetivos e aprendizagem
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


        if (this.requestProgress) {
            return;
          }

        this.requestProgress = true;

        const formData = new FormData();

        // const dadosCities = JSON.stringify(this.multselect);
        const dadosCities = JSON.stringify(this.atividade.faixaEtaria);
        formData.append('opcoes', dadosCities);
        console.log("antes da req dadosCities", dadosCities)

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

             // this.messageService.add({severity:'success', summary:'Cadastro adicionado com sucesso!'});
                this.messageService.add({severity:'success', summary:'Cadastro adicionado com sucesso!'});

                // console.log("enunciado:", this.atividade.enunciado)
                // console.log("nome", this.atividade.nome)
                // console.log("atividade.campoExperiencia: ", this.atividade.campoExperiencia)
                // console.log("atividade.campoExperiencia: ", this.atividade.aprendizagemDesenvolvimento)
                console.log("dadosCities", dadosCities)

                console.log("atividade.faixaEtaria: ", this.atividade.faixaEtaria)

                this.listaCadastros();
                this.requestProgress = false;

                // location.reload()

                // this.clearForm();
            })
            .catch(erro => this.messageService.add({severity:'error', summary:'ERRO AO CADASTRAR'}))
            .finally(() => this.requestProgress = false);
    }

    clearForm() {
        this.atividade = {
              nome: '',
              enunciado: '',
              faixaEtaria: '',
              campoExperiencia: '',
              aprendizagemDesenvolvimento: '',
             };
        }
}
