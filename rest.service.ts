import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import {of} from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { XmlParser } from '@angular/compiler';




const endpoint = 'https://animalswebapi.azurewebsites.net/'; // Servicio de imagenes 
const endpoint2 = 'https://rankingwebapi.azurewebsites.net/'; // Servicio de rannking 
const endpoint3 = 'https://ruleswebservice.azurewebsites.net/' // Servicio de reglas

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

@Injectable()
export class RestService {
  constructor(private http: HttpClient ) { }

  public xml;

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
  handleError<T>(arg0: string): (err: any, caught: Observable<any>) => import("rxjs").ObservableInput<any> {
    throw new Error("Method not implemented.");
  }

  //Servicio de consumo de servicios de ranking 

  getRanking(): Observable<any> {
    return this.http.get(endpoint2 + 'Ranking/GetTopRanking?Top=10').pipe(
      map(this.extractData));
  }

  rankingSearch (search): Observable<any> {
    console.log(search);
    return this.http.post<any>(endpoint2 + 'Ranking/InsertPosition', JSON.stringify(search), httpOptions).pipe(
      tap((search) => console.log(`Blind Search w/ id=${search.id}`)),
      catchError(this.handleError<any>('Blind Search'))
    );
  }

  // Reglas del juego
  
  
   soapAnimals(){

    const promesa = new Promise((res , rej) => {
    var str = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><GetReglas xmlns="http://Microsoft.ServiceModel.Samples" /></s:Body></s:Envelope>`
    var symbol = "MSFT"; 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://ruleswebservice.azurewebsites.net/Service1.svc",true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            console.log("si entro ?")
            res(xmlhttp.responseXML)
        }
    }
    xmlhttp.setRequestHeader("SOAPAction", "http://Microsoft.ServiceModel.Samples/IService1/GetReglas");
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    var xml = str;
    xmlhttp.send(xml);
  });


  return promesa

  }
  xmlToJson(xml) {
    var obj = {};
    if (4 === xml.nodeType) {
        obj = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var TEXT_NODE_TYPE_NAME = '#text',
                item = xml.childNodes.item(i),
                nodeName = item.nodeName,
                content;

            if (TEXT_NODE_TYPE_NAME === nodeName) {
                if ((null === xml.nextSibling) || (xml.localName !== xml.nextSibling.localName)) {
                    content = xml.textContent;
                } else if (xml.localName === xml.nextSibling.localName) {
                    content = (xml.parentElement.childNodes[0] === xml) ? [xml.textContent] : xml.textContent;
                }
                return content;
            } else {
                if ('undefined' === typeof(obj[nodeName])) {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if ('undefined' === typeof(obj[nodeName].length)) {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
    }
    return obj;
}




  

}