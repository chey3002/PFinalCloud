import { Component, OnInit } from '@angular/core';
import { RestService } from 'rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ranking-component',
  templateUrl: './ranking-component.component.html',
  styleUrls: ['./ranking-component.component.scss']
})
export class RankingComponentComponent implements OnInit {

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  public objeto = {};
  public records = []
  public resultado : any[] = [];
  

  ngOnInit(): void {

    this.TopSearchFunction();
    

  };

  getDataRecords(){
  };

  TopSearchFunction() {
    this.rest.getRanking().subscribe((result) => {
      this.records = result
      console.log(this.resultado)
    }, (err) => {
      console.log("ERROR")
      console.log(err);
    });
};

}
