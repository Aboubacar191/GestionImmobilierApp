import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ResidenceService } from './residence.service';
import {UserService} from "../../shared/Services/user.service";

@Component({
  selector: 'app-residence-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './residence-details.component.html',
  styleUrl: './residence-details.component.css'
})
export class ResidenceDetailsComponent implements OnInit {

  public residence: any;


  constructor(
    private residenceService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.residenceService.getResidenceById(+id).subscribe({
        next: data => {
          this.residence = data;
        },
        error: err => {
          console.error('Erreur lors de la récupération de la résidence :', err);
        }
      });
    }
  }
}

