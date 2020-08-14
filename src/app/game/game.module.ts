import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneDirective } from './../dropzone.directive';
import { UploaderComponent } from './../uploader/uploader.component';
import { UploadTaskComponent } from './../upload-task/upload-task.component';
import { TimerComponent } from './../timer/timer.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RankingComponentComponent } from '../ranking-component/ranking-component.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    GameComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    TimerComponent , 
    RankingComponentComponent
  ],
  imports: [CommonModule, GameRoutingModule, ReactiveFormsModule ],
  providers : [
    DatePipe
  ]
})
export class GameModule {}
