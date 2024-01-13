import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginRoutingModule } from '../login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    console.log('login component');
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make the login form invalid when the username is empty', () => {
    const usernameInput = component.loginForm.get('username');
    const passwordInput = component.loginForm.get('password');
    const loginForm = component.loginForm;

    usernameInput?.setValue(null);
    fixture.detectChanges();
    passwordInput?.setValue('pass');
    fixture.detectChanges();
    expect(loginForm?.invalid).toBeTruthy();
  });

  it('should make the login form invalid when the password is empty', () => {
    const usernameInput = component.loginForm.get('username');
    const passwordInput = component.loginForm.get('password');
    const loginForm = component.loginForm;

    usernameInput?.setValue('user');
    fixture.detectChanges();
    passwordInput?.setValue(null);
    fixture.detectChanges();
    expect(loginForm?.invalid).toBeTruthy();
  });

  it('should make the login form valid when both fields are filled correctly', () => {
    const usernameInput = component.loginForm.get('username');
    const passwordInput = component.loginForm.get('password');
    const loginForm = component.loginForm;

    usernameInput?.setValue('user');
    passwordInput?.setValue('pass');
    fixture.detectChanges();
    expect(loginForm?.valid).toBeTruthy();
  });

  it('should not accept characters different from letters and numbers on the username input', () => {
    const usernameInput = component.loginForm.get('username');
    const passwordInput = component.loginForm.get('password');
    const loginForm = component.loginForm;

    usernameInput?.setValue('user!');
    passwordInput?.setValue('pass');
    fixture.detectChanges();
    expect(loginForm?.invalid).toBeTruthy();
  });

  it('should accept a username of exactly 35 characters in length (limit)', () => {
    const usernameInput = component.loginForm.get('username');
    const passwordInput = component.loginForm.get('password');
    const loginForm = component.loginForm;
    const testUername: string = `a`.repeat(35);
    usernameInput?.setValue(testUername);
    passwordInput?.setValue('pass');
    fixture.detectChanges();
    expect(loginForm?.valid).toBeTruthy();
  });

  it('should NOT accept a username greater than 35 characters in length (limit)', () => {
    const usernameInput = component.loginForm.get('username');
    const passwordInput = component.loginForm.get('password');
    const loginForm = component.loginForm;
    const testUername: string = `a`.repeat(36);
    usernameInput?.setValue(testUername);
    passwordInput?.setValue('pass');
    fixture.detectChanges();
    expect(loginForm?.invalid).toBeTruthy();
  });
});
