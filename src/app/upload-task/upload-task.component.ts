import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { RestService } from 'rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AuthService } from './../auth/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  public resultado;
  public resultado2;
  public objeto = {};
  public userName;
  public descripcion = 'Caballo';
  public time;
  public date; 
  public animal;
  public ranking = {};
  public myDate = new Date();

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore ,
    public rest:RestService, 
    private route: ActivatedRoute, 
    private router: Router,
    public dataService : DataService , 
    private authSvc: AuthService,
    private datePipe: DatePipe
  ) {}
 

  async ngOnInit() {
    this.startUpload();
    this.userName = (await this.authSvc.getCurrentUser()).displayName
  }

  startUpload() {
    this.descripcion = this.dataService.valueAnimal
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    console.log(this.percentage);

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.objeto = {
          'URL' : this.downloadURL
        };

        
        
        this.AnimalSearchFunction();

        this.db
          .collection('files')
          .add({ downloadURL: this.downloadURL, path });
      })
    );
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
        this.animal = this.descripcion;
        this.ranking = {
          'Username': this.userName,
          'Time':this.time,
          'Date': this.date,
          'AnimalGame': this.animal
        }
        this.RankingSearchFunction()
      }else{
        alert('Imagen Incorrecta, por favor intente de nuevo')
     }
    }, (err) => {
      console.log("ERROR")
      console.log(err);
    });
};

RankingSearchFunction() {
  this.rest.rankingSearch(this.ranking).subscribe((result) => {
    this.resultado2 = result
    console.log(this.resultado2);
  }, (err) => {
    console.log("ERROR")
    console.log(err);
  });
};

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }




}
