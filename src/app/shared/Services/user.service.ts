import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiResidences = 'http://localhost:8080/api/residences';
  private apiEquipements = 'http://localhost:8080/api/equipements';
  private apiMaintenances = 'http://localhost:8080/api/maintenances';
  private apiPaiements = 'http://localhost:8080/api/paiements';
  private apiInstallations = 'http://localhost:8080/api/installations';

  constructor(private http: HttpClient) {}

  // Résidences
  getAllResidences(): Observable<any> {
    return this.http.get(this.apiResidences);
  }

  getResidenceById(id: number): Observable<any> {
    return this.http.get(`${this.apiResidences}/${id}`);
  }

  createResidence(residence: any): Observable<any> {
    return this.http.post(this.apiResidences, residence);
  }

  updateResidence(id: number, residence: any): Observable<any> {
    return this.http.put(`${this.apiResidences}/${id}`, residence);
  }

  deleteResidence(id: number): Observable<any> {
    return this.http.delete(`${this.apiResidences}/${id}`);
  }

  // Équipements
  getAllEquipements(): Observable<any> {
    return this.http.get(this.apiEquipements);
  }

  getEquipementById(id: number): Observable<any> {
    return this.http.get(`${this.apiEquipements}/${id}`);
  }

  createEquipement(equipement: any): Observable<any> {
    return this.http.post(this.apiEquipements, equipement);
  }

  updateEquipement(id: number, equipement: any): Observable<any> {
    return this.http.put(`${this.apiEquipements}/${id}`, equipement);
  }

  deleteEquipement(id: number): Observable<any> {
    return this.http.delete(`${this.apiEquipements}/${id}`);
  }

  // Maintenances
  getAllMaintenances(): Observable<any> {
    return this.http.get(this.apiMaintenances);
  }

  getMaintenanceById(id: number): Observable<any> {
    return this.http.get(`${this.apiMaintenances}/${id}`);
  }

  createMaintenance(maintenance: any): Observable<any> {
    return this.http.post(this.apiMaintenances, maintenance);
  }

  updateMaintenance(id: number, maintenance: any): Observable<any> {
    return this.http.put(`${this.apiMaintenances}/${id}`, maintenance);
  }

  deleteMaintenance(id: number): Observable<any> {
    return this.http.delete(`${this.apiMaintenances}/${id}`);
  }

  // Paiements
  getAllPaiements(): Observable<any> {
    return this.http.get(this.apiPaiements);
  }

  getPaiementById(id: number): Observable<any> {
    return this.http.get(`${this.apiPaiements}/${id}`);
  }

  createPaiement(paiement: any): Observable<any> {
    return this.http.post(this.apiPaiements, paiement);
  }

  updatePaiement(id: number, paiement: any): Observable<any> {
    return this.http.put(`${this.apiPaiements}/${id}`, paiement);
  }

  deletePaiement(id: number): Observable<any> {
    return this.http.delete(`${this.apiPaiements}/${id}`);
  }

  // Installations
  getAllInstallations(): Observable<any> {
    return this.http.get(this.apiInstallations);
  }

  getInstallationById(id: number): Observable<any> {
    return this.http.get(`${this.apiInstallations}/${id}`);
  }

  createInstallation(installation: any): Observable<any> {
    return this.http.post(this.apiInstallations, installation);
  }

  updateInstallation(id: number, installation: any): Observable<any> {
    return this.http.put(`${this.apiInstallations}/${id}`, installation);
  }

  deleteInstallation(id: number): Observable<any> {
    return this.http.delete(`${this.apiInstallations}/${id}`);
  }
}


