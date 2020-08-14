import { Component, OnInit, OnDestroy , Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnDestroy {

  constructor(public dataService : DataService){

  }
  counter: number;
  timerRef;
  running: boolean = false;
  startText = '🏁';
  public ttshow;

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = '🛑';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.ttshow = ((Date.now() - startTime) / 1000).toFixed(1);
        this.counter = +this.ttshow;
      });
    } else {
      this.startText = '🔄 ';
      this.dataService.time = this.ttshow
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.running = false;
    this.startText = '🏁';
    this.counter = undefined;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}
