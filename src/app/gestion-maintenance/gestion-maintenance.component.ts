import { Component, OnInit } from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../shared/Services/user.service";
import {PersonService} from "../shared/Services/person.service";
import {ResidenceService} from "../gestion-residence/residence-details/residence.service";



@Component({
  selector: 'app-gestion-maintenance',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule, FormsModule, RouterLink, DatePipe],
  templateUrl: './gestion-maintenance.component.html',
  styleUrl: './gestion-maintenance.component.css'
})
export class GestionMaintenanceComponent implements OnInit {

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
  public filteredMaintenances: any[] = [];

  // Liste dynamique des résidences et statuts
  residences: string[] = [];
  statuts: string[] = [];

  maintenances: any[] = [

  ];

  ngOnInit() {
    this.userService.getAllMaintenance().subscribe(
      (data: any[]) => {
        if (data && Array.isArray(data)) {
          this.maintenances = data.filter(item => typeof item === 'object');
          this.filteredMaintenances = this.maintenances;

          // Extraire les résidences uniques à partir des maintenances
          this.residences = [
            ...new Set(
              this.maintenances.map(m => m.residence?.nomResidence).filter(nom => !!nom)
            )
          ];

          // Extraire les statuts uniques
          this.statuts = [
            ...new Set(
              this.maintenances.map(m => m.statut).filter(st => !!st)
            )
          ];
        }
      },
      (error: any) => console.error('Erreur lors de la récupération des maintenances', error)
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

  private applyFilters() {
    this.filteredMaintenances = this.maintenances.filter(maintenance => {
      const nomResidence = maintenance.residence?.nomResidence || '';

      return (
        (this.selectedResidence === '' || nomResidence === this.selectedResidence) &&
        (this.selectedStatut === '' || maintenance.statut === this.selectedStatut) &&
        (this._searchFilter === '' || maintenance.nomMaintenance?.toLowerCase().includes(this._searchFilter.toLowerCase()))
      );
    });
  }

}
