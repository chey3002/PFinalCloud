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
  

   soapAnimals() {
    var str = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><GetReglas xmlns="http://Microsoft.ServiceModel.Samples" /></s:Body></s:Envelope>`
    var symbol = "MSFT"; 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://ruleswebservice.azurewebsites.net/Service1.svc",true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
             xmlhttp.responseText;
            
            //var json = XMLObjectifier.xmlToJSON(xmlhttp.responseXML);
            //console.log(json)
            //var result = json.Body[0].GetQuoteResponse[0].GetQuoteResult[0].Text;
            // Result text is escaped XML string, convert string to XML object then convert to JSON object
            //son = XMLObjectifier.xmlToJSON(XMLObjectifier.textToXML(result));
            //alert(symbol + ' Stock Quote: $' + json.Stock[0].Last[0].Text); 
        }
    }

    xmlhttp.setRequestHeader("SOAPAction", "http://Microsoft.ServiceModel.Samples/IService1/GetReglas");
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    console.log(xmlhttp.responseText.valueOf)
    var xml = str;
    xmlhttp.send(xml);
    
  }
  xml2json(xml) {
    try {
      var obj = {};
      if (xml.children.length > 0) {
        for (var i = 0; i < xml.children.length; i++) {
          var item = xml.children.item(i);
          var nodeName = item.nodeName;
  
          if (typeof (obj[nodeName]) == "undefined") {
            obj[nodeName] = this.xml2json(item);
          } else {
            if (typeof (obj[nodeName].Push) == "undefined") {
              var old = obj[nodeName];
  
              obj[nodeName] = [];
              obj[nodeName].Push(old);
            }
            obj[nodeName].Push(this.xml2json(item));
          }
        }
      } else {
        obj = xml.textContent;
      }
      return obj;
    } catch (e) {
        console.log(e.message);
    }
  }


  

  /*
  soapRequest(){
    var oXmlHttp = new XMLHttpRequest();
    oXmlHttp.open("POST", "https://ruleswebservice.azurewebsites.net/Service1.svc'", false);
    oXmlHttp.setRequestHeader("Content-Type", "text/xml");
    oXmlHttp.setRequestHeader("SOAPAction", "http://Microsoft.ServiceModel.Samples/IService1/GetReglas");
    oXmlHttp.send(`<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><GetReglas xmlns="http://Microsoft.ServiceModel.Samples" /></s:Body></s:Envelope>`);
    console.log(oXmlHttp.responseXML.selectSingleNode())
    
  }*/


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}