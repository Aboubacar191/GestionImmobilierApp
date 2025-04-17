import { AuthService } from './../some/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth2Service } from './auth2.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public errorMessage: string | null = null;
  public user : User = new User();



  constructor(private http: HttpClient, private router: Router, private AuthService: AuthService, private auth2Service : Auth2Service) {}


  ngOnInit(){


  }


  dicClass: string[] = ["input-div", "one"];
  dicClass2: string[] = ["input-div", "two"];

  isFocus(): void {
    if (!this.dicClass.includes("focus")) {
      this.dicClass.push("focus");
    }
  }

  isFocus2(): void {
    if (!this.dicClass2.includes("focus")) {
      this.dicClass2.push("focus");
    }
  }

  checkInput(event: FocusEvent): void {
    const inputElement = (event.target as HTMLInputElement);
    if (!inputElement.value) {
      this.dicClass = this.dicClass.filter(c => c !== "focus");
    }
  }

  checkInput2(event: FocusEvent): void {
    const inputElement = (event.target as HTMLInputElement);
    if (!inputElement.value) {
      this.dicClass2 = this.dicClass2.filter(c => c !== "focus");
    }
  }

  public saveData(registerForm: NgForm) {
    this.http.post<any>('http://localhost:8080/api/auth/login', this.user)
      .subscribe({
        next: (response) => {
          const typeUser = response.TypeUser;
          const Token = response.token;
          const id = response.id;

          if (typeUser === 'ADMIN') {
            this.AuthService.saveToken(Token);
            this.auth2Service.savedata(typeUser, id);
            this.router.navigate(['/Admin']);
          } else if (typeUser === 'Locataire') {
            this.AuthService.saveToken(Token);
            this.auth2Service.savedata(typeUser, id);
            this.router.navigate(['/DLocataire']);
          } else if (typeUser === 'Gestionnaire') {
            this.AuthService.saveToken(Token);
            this.auth2Service.savedata(typeUser, id);
            this.router.navigate(['/Gestionnaire']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error || 'Une erreur est survenue lors de la connexion';
        }
      });
  }



}
