import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnDestroy {
  counter: number;
  timerRef;
  running: boolean = false;
  startText = '🏁';
  ttshow: String;

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
