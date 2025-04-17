import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth2Service } from '../../login/auth2.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrlAdmins = 'http://localhost:8080/api/administrateurs';
  private apiUrlLocataires = 'http://localhost:8080/api/locataires';

  constructor(private http: HttpClient, private Auth2: Auth2Service) {}

  // Récupérer tous les administrateurs
  getAllAdmins(): Observable<any> {
    return this.http.get<any>(this.apiUrlAdmins);
  }

  // Récupérer un administrateur par ID
  getAdminById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmins}/${id}`);
  }

  // Ajouter un administrateur
  saveAdmin(admin: any): Observable<any> {
    return this.http.post<any>(this.apiUrlAdmins, admin);
  }

  // Modifier un administrateur
  updateAdmin(id: string, admin: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlAdmins}/${id}`, admin);
  }

  // Supprimer un administrateur
  deleteAdmin(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlAdmins}/${id}`);
  }

  // Récupérer tous les locataires
  getAllLocataires(): Observable<any> {
    return this.http.get<any>(this.apiUrlLocataires);
  }

  // Récupérer un locataire par ID
  getLocataireById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlLocataires}/${id}`);
  }

  // Ajouter un locataire
  saveLocataire(locataire: any): Observable<any> {
    return this.http.post<any>(this.apiUrlLocataires, locataire);
  }

  // Modifier un locataire
  updateLocataire(id: string, locataire: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlLocataires}/${id}`, locataire);
  }

  // Supprimer un locataire
  deleteLocataire(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlLocataires}/${id}`);
  }
}
