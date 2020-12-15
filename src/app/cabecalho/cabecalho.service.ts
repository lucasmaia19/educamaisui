import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CabecalhoService {

     constructor(private http: HttpClient) { }

     listaCabecalhos() {
        return this.http.get('http://localhost:8080/atividade/cabecalho')
            .toPromise()
            .then(data => { return data; });
    }
}
