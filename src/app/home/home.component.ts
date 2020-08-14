import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';
import { RestService } from 'rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  public resultado;

  constructor(private authSvc: AuthService , public rest:RestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.TopSearchFunction();
  }

  TopSearchFunction() {
    this.rest.soapAnimals()
};

}
