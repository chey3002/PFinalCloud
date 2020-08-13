import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import {of} from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';



const endpoint = 'https://animalswebapi.azurewebsites.net/'; // Servicio de imagenes 
const endpoint2 = 'https://rankingwebapi.azurewebsites.net/'; // Servicio de rannking 


  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

@Injectable()
export class RestService {

  
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  // Funciones de  consumo del servicio de imagenes

  AnimalSearch (search): Observable<any> {
    console.log(search);
    return this.http.post<any>(endpoint + 'Animals/ClassifyAnimalByURL', JSON.stringify(search), httpOptions).pipe(
      tap((search) => console.log(`Blind Search w/ id=${search.id}`)),
      catchError(this.handleError<any>('Blind Search'))
    );
  }

  //Servicio de consumo de servicios de ranking 

  getRanking(): Observable<any> {
    return this.http.get(endpoint2 + 'Ranking/GetTopRanking?Top=10').pipe(
      map(this.extractData));
  }
  /*
  RankingSearch (): Observable<any> {
    return this.http.post<any>(endpoint2 + 'Ranking/GetTopRanking?Top=1', httpOptions).pipe(
      tap((search) => console.log(`Blind Search w/ id=${search.id}`)),
      catchError(this.handleError<any>('Blind Search'))
    );
  }*/


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}