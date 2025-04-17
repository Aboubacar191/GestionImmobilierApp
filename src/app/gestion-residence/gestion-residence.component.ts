import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { FormsModule } from "@angular/forms";
import {UserService} from "../shared/Services/user.service";
import {PersonService} from "../shared/Services/person.service";
import {ResidenceService} from "./residence-details/residence.service";

@Component({
  selector: 'app-gestion-residence',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './gestion-residence.component.html',
  styleUrl: './gestion-residence.component.css'
})
export class GestionResidenceComponent implements OnInit {
  constructor(
    private userService: UserService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}

  private _residenceFilter: string = '';
  private _selectedType: string = '';

  public residences: any[] = [];
  public filteredResidences: any[] = [];

  ngOnInit() {
    this.userService.getAllResidences().subscribe(
      data => {
        if (data) {
          this.residences = data;
          this.filteredResidences = data;
        }
      },
      error => console.error('Erreur lors de la récupération des résidences', error)
    );
  }

  public get residenceFilter(): string {
    return this._residenceFilter;
  }

  public set residenceFilter(filter: string) {
    this._residenceFilter = filter;
    this.applyFilters();
  }

  public get selectedType(): string {
    return this._selectedType;
  }

  public set selectedType(type: string) {
    this._selectedType = type;
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredResidences = this.residences.filter(residence => {
      return (
        (this._selectedType === '' || residence.typeLogement === this._selectedType) &&
        (this._residenceFilter === '' || residence.nomResidence.toLowerCase().includes(this._residenceFilter.toLowerCase()))
      );
    });
  }
}

