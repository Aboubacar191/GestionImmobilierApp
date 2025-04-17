import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from "../shared/Services/user.service";
import {PersonService} from "../shared/Services/person.service";
import {ResidenceService} from "../gestion-residence/residence-details/residence.service";



@Component({
  selector: 'app-gestion-personnel',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './gestion-personnel.component.html',
  styleUrls: ['./gestion-personnel.component.css']
})
export class GestionPersonnelComponent implements OnInit {



  constructor(
    private userService: UserService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}
  private _searchFilter: string = '';
  private _selectedRole: string = ''; // Correction : _selectedResidence → _selectedRole
  public filteredPersonnels: any[] = [];

  // Liste dynamique des rôles
  public roles: string[] = [];

  // Liste des employés
  personnels: any[] = [

  ];

  ngOnInit() {
    this.personService.getAllAdmins().subscribe(
      data => {
        if (data && Array.isArray(data)) {
          this.personnels = data
            .filter(item => typeof item === 'object')
            .map(item => {
              return {
                id: item.id,
                nom: item.nom,
                prenom: item.prenom,
                email: item.email,
                adresse: item.adresse,
                imageURL: item.imageURL,
                telephone1: item.telephone1,
                telephone2: item.telephone2,
                role: item.compteUsers?.[0]?.roleEntities?.name || ''
              };
            });

          this.filteredPersonnels = this.personnels;
          this.roles = [...new Set(this.personnels.map(p => p.role))];
        }
      },
      error => console.error('Erreur lors de la récupération des employés', error)
    );
  }



  public get searchFilter(): string {
    return this._searchFilter;
  }

  public set searchFilter(filter: string) {
    this._searchFilter = filter;
    this.applyFilters();
  }

  public get selectedRole(): string {
    return this._selectedRole;
  }

  public set selectedRole(role: string) {
    this._selectedRole = role;
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredPersonnels = this.personnels.filter(personnel => {
      const fullName = `${personnel.nom} ${personnel.prenom}`.toLowerCase();
      return (
        (this.selectedRole === '' || personnel.role === this.selectedRole) &&
        (this._searchFilter === '' || fullName.includes(this._searchFilter.toLowerCase()))
      );
    });
  }

}
