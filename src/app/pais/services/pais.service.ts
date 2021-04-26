import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.eu/rest/v2';
  endpoint: string = 'name';

  get httpParams (){
    return new HttpParams()
    .set('fields','name;population;alpha2Code;capital;flag');;
  }

  constructor( private http: HttpClient ) { }

  buscarPais( termino: string ): Observable<Country[]> {

    this.endpoint = 'name';
    const url = `${ this.apiUrl }/${this.endpoint}/${ termino }`;
    return this.http.get<Country[]>( url, { params: this.httpParams }  );
  }

  buscarCapital( termino: string ):Observable<Country[]>{
    this.endpoint = 'capital';
    const url = `${ this.apiUrl }/${this.endpoint}/${ termino }`;
    return this.http.get<Country[]>( url, { params: this.httpParams }  );
  }

  getPaisPorAlpha( id: string ):Observable<Country>{
    this.endpoint = 'alpha';
    const url = `${ this.apiUrl }/${this.endpoint}/${ id }`;
    return this.http.get<Country>( url );
  }

  buscarRegion( termino: string ):Observable<Country[]>{

    

    this.endpoint = 'region';
    const url = `${ this.apiUrl }/${this.endpoint}/${ termino }`;
    return this.http.get<Country[]>( url, { params: this.httpParams } ).
      pipe(
        tap ( console.log )
      )
  }

}
