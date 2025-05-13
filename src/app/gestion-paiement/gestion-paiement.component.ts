import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {UserService} from "../shared/Services/user.service";
import {PersonService} from "../shared/Services/person.service";
import {ResidenceService} from "../gestion-residence/residence-details/residence.service";

@Component({
  selector: 'app-gestion-paiement',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './gestion-paiement.component.html',
  styleUrls: ['./gestion-paiement.component.css']
})
export class GestionPaiementComponent implements OnInit {
  constructor(
    private userService: UserService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}

  private _searchFilter: string = '';
  private _selectedResidence: string = '';
  private _selectedStatut: string = '';
  private _selectedMethode: string = '';

  public filteredPaiements: any[] = [];

  residences: string[] = [];
  statuts: string[] = [];
  methodes: string[] = [];

  paiements: any[] = [];

  ngOnInit() {
    this.userService.getAllPaiements().subscribe(
        (data: any[]) => {
        if (data && Array.isArray(data)) {
          this.paiements = data.filter(item => typeof item === 'object');
          this.filteredPaiements = this.paiements;

          // Extraire les résidences uniques à partir des paiements
          this.residences = [
            ...new Set(
              this.paiements.map((p: any) =>
                typeof p.locataire?.residence === 'string'
                  ? p.locataire.residence
                  : p.locataire?.residence?.nomResidence || ''
              )
            )
          ];
        }
      },
        (error: any) => console.error('Erreur lors de la récupération des paiements', error)
    );
  }

  public get searchFilter(): string {
    return this._searchFilter;
  }

  public set searchFilter(filter: string) {
    this._searchFilter = filter;
    this.applyFilters();
  }

  public get selectedResidence(): string {
    return this._selectedResidence;
  }

  public set selectedResidence(residence: string) {
    this._selectedResidence = residence;
    this.applyFilters();
  }

  public get selectedStatut(): string {
    return this._selectedStatut;
  }

  public set selectedStatut(statut: string) {
    this._selectedStatut = statut;
    this.applyFilters();
  }

  public get selectedMethode(): string {
    return this._selectedMethode;
  }

  public set selectedMethode(methode: string) {
    this._selectedMethode = methode;
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredPaiements = this.paiements.filter(paiement => {
      const locataire = paiement.locataire;
      const fullName = (locataire?.prenom + ' ' + locataire?.nom).toLowerCase();
      const residenceName =
        typeof locataire?.residence === 'string'
          ? locataire.residence
          : locataire?.residence?.nomResidence || '';

      return (
        (this.selectedResidence === '' || residenceName === this.selectedResidence) &&
        (this.selectedStatut === '' || paiement.statut === this.selectedStatut) &&
        (this.selectedMethode === '' || paiement.methodeDepaiement === this.selectedMethode) &&
        (this._searchFilter === '' || fullName.includes(this._searchFilter.toLowerCase()))
      );
    });
  }
  getNomPrenomLocataireById(id: number): string {
    for (const paiement of this.paiements) {
      const locataire = paiement.locataire;
      if (typeof locataire === 'object' && locataire.id === id) {
        return locataire.nom + ' ' + locataire.prenom;
      }
    }
    return 'Locataire inconnu';
  }


}
