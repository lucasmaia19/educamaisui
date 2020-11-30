import { Cidade } from './cidade';
import { Pais } from './pais';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TesteService {

    getPaises() {
        return [
         new Pais(1, 'Brasil' ),
         new Pais(2, 'USA' ),
         new Pais(3, 'Itália' )
        ];
    }

    getCidades() {
        return [
          new Cidade(1, 1, 'São Paulo' ),
          new Cidade(2, 1, 'Brasília' ),
          new Cidade(3, 1, 'Rio de Janeiro'),
          new Cidade(4, 1, 'Santos'),
          new Cidade(5, 2, 'New Yord' ),
          new Cidade(6, 2, 'Chicago'),
          new Cidade(7, 2, 'Los Angeles' ),
          new Cidade(8, 3, 'Roma' ),
          new Cidade(9, 3, 'Florença' ),
          new Cidade(10, 3, 'Veneza')
         ];

    }

  constructor() { }
}
