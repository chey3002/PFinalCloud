import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-Mynavbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLogged = false;

  constructor(private authSvc: AuthService, private router: Router) {
    
  }
  public user$: Observable<any> = this.authSvc.afAuth.user;
  
  async ngOnInit() {
    //console.log((await this.authSvc.getCurrentUser()).displayName)
  }
  onLogout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}
