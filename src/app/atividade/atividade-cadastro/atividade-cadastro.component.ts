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

@Component({
    selector: 'app-atividade-cadastro',
    templateUrl: './atividade-cadastro.component.html',
    styleUrls: ['./atividade-cadastro.component.css']
})
export class AtividadeCadastroComponent implements OnInit {

    apiUploadUrl = 'https://educa-mais-api.herokuapp.com/atividade/upload-com-dados';
    apiuploadComDadosUrl = 'https://educa-mais-api.herokuapp.com/atividade/upload-com-dados';

    atividade = new Atividade();
    @ViewChild('arquivo') arquivo: FileUpload;

    atividades: any;

    requestProgress = false;

    faixaEtariaList = new Array<any>();
    campoExperienciaList = new Array<any>();
    aprendizagemDesenvolvimento = new Array<any>();

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private router: Router,
        private cadastroService: CadastroService,
        ) {}

    ngOnInit(): void {

        // this.atividade = { nome: 'Colorir',
            //  enunciado: 'Ajude a Monica a chegar na flor! Passe o lápis nos caminhos até chegar na flor!' };

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

    uploadComDados(): void {

        if (this.requestProgress) {
            return;
          }

        this.requestProgress = true;

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
            .then(response => {

            // this.messageService.add({severity:'success', summary:'Cadastro adicionado com sucesso!'});
                this.messageService.add({severity:'success', summary:'Cadastro adicionado com sucesso!'});

                console.log("enunciado:", this.atividade.enunciado)
                console.log("nome", this.atividade.nome)
                console.log("atividade.faixaEtaria: ", this.atividade.faixaEtaria)
                console.log("atividade.campoExperiencia: ", this.atividade.campoExperiencia)
                console.log("atividade.campoExperiencia: ", this.atividade.aprendizagemDesenvolvimento)

                this.listaCadastros();
                this.requestProgress = false;

                // location.reload()

                this.clearForm();
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
