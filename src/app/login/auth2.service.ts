import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth2Service {

  private utilisateurSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
    // Initialisation à partir du token s'il existe
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.decodeToken(token);
      if (decoded) {
        this.utilisateurSubject.next(decoded);
      }
    }
  }

  public savedata(typeuser: string, id: string): void {
    localStorage.setItem('typeUser', typeuser);
    localStorage.setItem('ID', id);
    this.utilisateurSubject.next({ role: typeuser, id });
  }

  public get typeUser(): string | null {
    return localStorage.getItem('typeUser');
  }

  public get userId(): string | null {
    return localStorage.getItem('ID');
  }

  public get utilisateur$() {
    return this.utilisateurSubject.asObservable(); // observable pour les composants
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = atob(base64);
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error('Erreur de décodage du token :', e);
      return null;
    }
  }

  clearData(): void {
    localStorage.removeItem('typeUser');
    localStorage.removeItem('ID');
    localStorage.removeItem('token');
    this.utilisateurSubject.next(null);
  }
}
