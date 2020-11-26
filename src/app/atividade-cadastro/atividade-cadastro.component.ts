import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';

export class Atividade {
    nome?: string;
    tag?: string;
    arquivo?: File;
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


    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.atividade = { nome: 'Colorir', tag: 'Maternal' };
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
            .then(response => console.log(response));

    }

}
