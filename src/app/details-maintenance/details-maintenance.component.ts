import {Component, OnInit} from '@angular/core';
import {DatePipe, NgClass} from "@angular/common";
import {UserService} from "../shared/Services/user.service";
import {PersonService} from "../shared/Services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResidenceService} from "../gestion-residence/residence-details/residence.service";

@Component({
  selector: 'app-details-maintenance',
  standalone: true,
  imports: [
    NgClass,
    DatePipe
  ],
  templateUrl: './details-maintenance.component.html',
  styleUrl: './details-maintenance.component.css'
})
export class DetailsMaintenanceComponent implements OnInit{

  constructor(
    private userService: UserService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}
  maintenance:any={};

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;

      const personSubscription = this.userService.getMaintenanceById(id).subscribe(
        data => {
          if (data) {
            this.maintenance = data;
          }
        },
        error => console.error('Erreur lors de la récupération de la maintenance', error)
      );


    }
  }



}
