import { Component, OnInit , Input } from '@angular/core';
import { RestService } from 'rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TimerComponent  } from '../timer/timer.component'


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() time;
  public resultado;
  public pregunta = ''

  public categorias = []
  public animales = []

  public index;

  constructor() {}

  ngOnInit(): void {
    
  }

  


}
