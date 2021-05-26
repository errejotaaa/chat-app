import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup() {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authService
      .signup(email, password, displayName)
      .then((resolve) => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.errorMsg = error.message;
      });
  }
}
