import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {UserService} from "../shared/Services/user.service";
import {PersonService} from "../shared/Services/person.service";
import {ResidenceService} from "../gestion-residence/residence-details/residence.service";



@Component({
  selector: 'app-gestion-locataire',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './gestion-locataire.component.html',
  styleUrl: './gestion-locataire.component.css'
})
export class GestionLocataireComponent implements OnInit {

  constructor(
    private userService: UserService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}

  private _searchFilter: string = '';
  private _selectedResidence: string = '';

  public filteredLocataires: any[] = [];
  public locataires: any[] = [];

  // Liste dynamique des résidences
  public residences: string[] = [];

  ngOnInit() {
    this.personService.getAllLocataires().subscribe(
      data => {
        if (data && Array.isArray(data)) {
          this.locataires = data.filter(item => typeof item === 'object'); // ⚠️ Évite les entrées comme "2"
          this.filteredLocataires = this.locataires;

          // Extraire les résidences uniques à partir des locataires
          this.residences = [...new Set(this.locataires.map(loc => loc.residence))];
        }
      },
      error => console.error('Erreur lors de la récupération des locataires', error)
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

  private applyFilters() {
    this.filteredLocataires = this.locataires.filter(locataire => {
      const matchesResidence = this.selectedResidence === '' || locataire.residence === this.selectedResidence;
      const fullName = `${locataire.nom} ${locataire.prenom}`.toLowerCase();
      const matchesName = this._searchFilter === '' || fullName.includes(this._searchFilter.toLowerCase());

      return matchesResidence && matchesName;
    });
  }
}

