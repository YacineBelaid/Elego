import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) {}

  faUser = faUser;
  loginForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]+$'),
        Validators.maxLength(35),
      ],
    ],
    password: ['', [Validators.required]],
  });

  onSubmitLogin(): void {
    this.router.navigate(['/admin/adminAccueil']);
  }

  ngOnInit(): void {}
}
