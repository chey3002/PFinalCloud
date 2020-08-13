import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from 'rest.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})


export class UploaderComponent{
  
  isHovering: boolean;
  
  public objeto = {};
  public resultado:any;
  public urlAnimal: string;
  
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){

     

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
        console.log(this.resultado)
      }, (err) => {
        console.log("ERROR")
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
