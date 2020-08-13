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
  public objeto = {};
  public descripcion = 'Caballo';

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore ,
    public rest:RestService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}
 

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
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
      }else{
        alert('Imagen Incorrecta, por favor intente de nuevo')
     }
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
