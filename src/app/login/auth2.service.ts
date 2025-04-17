// Exemple de service d'authentification
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../some/auth.service';
import { Router } from '@angular/router';
import { User } from './User';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth2Service {

  constructor(private http: HttpClient, private router: Router, private AuthService: AuthService) {}

  id : string | null =null;
  public savedata( typeuser : string, id : string){
    localStorage.setItem('typeUser', typeuser);
    localStorage.setItem('ID' , id);
    this.id = localStorage.getItem('ID') || '';
  }
  
  private utilisateurSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  



}
