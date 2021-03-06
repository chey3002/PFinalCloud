import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from 'rest.service';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { AuthService } from './../auth/services/auth.service';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})


export class UploaderComponent{
  
  isHovering: boolean;
  
  public objeto = {};
  public ranking = {};
  public descripcion = 'Caballo'
  public resultado:any;
  public resultado2;
  public urlAnimal: string;
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public myDate = new Date();

  public userName;
  public time;
  public date;
  public animal;


  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router , 
              private authSvc: AuthService , public dataService : DataService , private datePipe: DatePipe ) {
  
  }

  async ngOnInit(){
    this.userName = (await this.authSvc.getCurrentUser()).displayName
    console.log(this.authSvc.getCurrentUser())
    this.TopSearchFunction();
  };

  sendURL(){
    // Crear el objeto que se enviara al servidor
    this.objeto = {
      "URL" : this.urlAnimal
    };
    // LLevar ese objeto al servidor - Este metodo se impleneto en rest.service.ts
    console.log(this.objeto)

    this.AnimalSearchFunction();  
    

  };

  uploadListener($event: any): void { 

  }


  AnimalSearchFunction() {
      this.rest.AnimalSearch(this.objeto).subscribe((result) => {
        this.resultado = result
        if ( this.resultado['name'] == this.descripcion ){
          alert('Imagen Correcta')
          // Para el cronometro y envia la informacion a la base de datos 
          this.time = parseFloat(this.dataService.time);
          //this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
          this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-ddTHH:mm:ss') + 'Z';
          //this.date = '2020-08-12T20:00:00Z';
          this.animal = this.descripcion;
          this.ranking = {
            'username': this.userName,
            'time': this.time,
            'date': this.date,
            'animalGame': this.animal
          }
          this.RankingSearchFunction();
          
        }else{
          alert('Imagen Incorrecta, por favor intente de nuevo')
       }
      }, (err) => {
        console.log("ERROR")
        console.log(err);
      });
  };

  RankingSearchFunction() {
    this.rest.rankingSearch(this.ranking).subscribe((result2) => {
      this.resultado2 = result2
      console.log(this.resultado2);
      location.reload();
    }, (err) => {
      console.log(err);
    });
  };

  UrlForm = new FormGroup({
    url: new FormControl(''),
  });
  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  
  public resultado;
  public pregunta = ''

  public categorias = []
  public animales = []

  public index;
  public value;


  TopSearchFunction() {
    this.rest.soapAnimals().then ((res) => {
      var json = JSON.stringify(this.xmlToJson(res))
      console.log(json)
      var aux = json.split('"a:NombreAnimal":').splice(1)
      for (var i of aux) {
        var auxI = i.split('"a:NombreCategoria"')
        this.animales.push(auxI[0])
        this.categorias.push[auxI[1]]    
      }
      console.log(this.animales)
      console.log(this.categorias)
      this.index = parseInt(this.getRandomArbitrary( 0 , this.animales.length - 1))
      console.log(this.index)
      this.value = this.animales[this.index].replace(/[^a-zA-Z ]/g, "")
      this.dataService.valueAnimal = this.value
      this.descripcion = this.value
      console.log(this.value)
   })
  };

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

getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

}
