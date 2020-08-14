import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from 'rest.service';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { AuthService } from './../auth/services/auth.service';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common';

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
          this.animal = "Caballo";
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
}
