import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {}
  async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      const usert = await this.authSvc.register(email, password);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}
