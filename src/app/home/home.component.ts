import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {}
}
