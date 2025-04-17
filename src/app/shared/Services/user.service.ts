import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/residences';
  private apiUr2 = 'http://localhost:8080/api/equipements';
  private apiUr3 = 'http://localhost:8080/api/compteUsers';
  private apiUr4 = 'http://localhost:8080/api/maintenances';
  private apiUr5 = 'http://localhost:8080/api/paiements';
  private apiUr6 = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) {}

  // Residences
  getAllResidences(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getResidenceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createResidence(residence: any): Observable<any> {
    return this.http.post(this.apiUrl, residence);
  }

  updateResidence(id: number, residence: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, residence);
  }

  deleteResidence(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Equipements
  getAllEquipements(): Observable<any> {
    return this.http.get(this.apiUr2);
  }

  getEquipementById(id: number): Observable<any> {
    return this.http.get(`${this.apiUr2}/${id}`);
  }

  createEquipement(equipement: any): Observable<any> {
    return this.http.post(this.apiUr2, equipement);
  }

  updateEquipement(id: number, equipement: any): Observable<any> {
    return this.http.put(`${this.apiUr2}/${id}`, equipement);
  }

  deleteEquipement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUr2}/${id}`);
  }

  // Compte Users
  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUr3);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUr3}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUr3, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUr3}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUr3}/${id}`);
  }

  // Maintenances
  getAllMaintenance(): Observable<any> {
    return this.http.get(this.apiUr4);
  }

  getMaintenanceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUr4}/${id}`);
  }

  createMaintenance(maintenance: any): Observable<any> {
    return this.http.post(this.apiUr4, maintenance);
  }

  updateMaintenance(id: number, maintenance: any): Observable<any> {
    return this.http.put(`${this.apiUr4}/${id}`, maintenance);
  }

  deleteMaintenance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUr4}/${id}`);
  }

  // Paiements
  getAllPaiements(): Observable<any> {
    return this.http.get(this.apiUr5);
  }

  getPaiementById(id: number): Observable<any> {
    return this.http.get(`${this.apiUr5}/${id}`);
  }

  createPaiement(paiement: any): Observable<any> {
    return this.http.post(this.apiUr5, paiement);
  }

  updatePaiement(id: number, paiement: any): Observable<any> {
    return this.http.put(`${this.apiUr5}/${id}`, paiement);
  }

  deletePaiement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUr5}/${id}`);
  }

  // Roles
  getAllRoles(): Observable<any> {
    return this.http.get(this.apiUr6);
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUr6}/${id}`);
  }

  createRole(role: any): Observable<any> {
    return this.http.post(this.apiUr6, role);
  }

  updateRole(id: number, role: any): Observable<any> {
    return this.http.put(`${this.apiUr6}/${id}`, role);
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.apiUr6}/${id}`);
  }
}

