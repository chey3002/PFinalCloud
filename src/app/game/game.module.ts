import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneDirective } from './../dropzone.directive';
import { UploaderComponent } from './../uploader/uploader.component';
import { UploadTaskComponent } from './../upload-task/upload-task.component';
import { TimerComponent } from './../timer/timer.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    GameComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    TimerComponent,
  ],
  imports: [CommonModule, GameRoutingModule, ReactiveFormsModule],
})
export class GameModule {}
