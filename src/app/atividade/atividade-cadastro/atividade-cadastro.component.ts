import { OAD } from './../model/oad';
import { FaixaEtaria } from './../model/faixaEtaria';
import { CampoEx } from './../model/campoEx';
import { CadastroService } from './../cadastro-.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';

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

    faixaCampoEx : CampoEx = new CampoEx(22,'Traços, sons, cores e formas');
    faixaEtariaSelecionada : FaixaEtaria = new FaixaEtaria(33,'Bebês (zero a 1 ano e 6 meses)');

    campoEx: CampoEx[];
    faixaEtaria: FaixaEtaria[];
    oad: OAD[];

    atividade = new Atividade();
    @ViewChild('arquivo') arquivo: FileUpload;

    constructor(
        private http: HttpClient,
        private router: Router,
        private cadastroService: CadastroService,
        ) {
            this.campoEx = this.cadastroService.getCampoEx();
            this.faixaEtaria = this.cadastroService.getFaixaEtaria();
        }

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
            .then(response => response);
            timeout(10000);
            // this.router.navigate(['']);
        }

        onSelect(id) {
            this.oad = this.cadastroService.getOAD().filter((item) => (item.faixaEtariaId && item.campoExId == id))
    }

}
