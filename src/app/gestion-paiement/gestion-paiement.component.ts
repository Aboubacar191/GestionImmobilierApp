import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from "../shared/Services/user.service";
import { PersonService } from "../shared/Services/person.service";
import { ResidenceService } from "../gestion-residence/residence-details/residence.service";

@Component({
  selector: 'app-gestion-paiement',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './gestion-paiement.component.html',
  styleUrls: ['./gestion-paiement.component.css']
})
export class GestionPaiementComponent implements OnInit {
  paiements: any[] = [];
  filteredPaiements: any[] = [];

  statuts: string[] = ['payé', 'impayé'];
  methodes: string[] = ['OrangeMoney', 'Wave', 'MTnMoney', 'Physique'];

  private _searchFilter: string = '';
  private _selectedStatut: string = '';
  private _selectedMethode: string = '';

  constructor(
    private userService: UserService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}

  ngOnInit(): void {
    this.userService.getAllPaiements().subscribe(
      data => {
        if (data && Array.isArray(data)) {
          this.paiements = data.filter(p => typeof p === 'object');
          this.filteredPaiements = [...this.paiements];
        }
      },
      error => console.error('Erreur lors de la récupération des paiements', error)
    );
  }

  // Getters/Setters avec filtre déclenché automatiquement
  public get searchFilter(): string {
    return this._searchFilter;
  }

  public set searchFilter(filter: string) {
    this._searchFilter = filter;
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

  applyFilters() {
    const search = this._searchFilter.toLowerCase().trim();

    this.filteredPaiements = this.paiements.filter(p => {
      const matchesSearch = search === '' ||
        p.nomLocataire?.toLowerCase().includes(search) ||
        p.prenomLocataire?.toLowerCase().includes(search);

      const matchesStatut = this._selectedStatut === '' || p.statut === this._selectedStatut;
      const matchesMethode = this._selectedMethode === '' || p.methodeDepaiement === this._selectedMethode;

      return matchesSearch && matchesStatut && matchesMethode;
    });
  }
}
