import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {Subscription} from "rxjs";
import {UserService} from "../../shared/Services/user.service";
import {PersonService} from "../../shared/Services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResidenceService} from "../../gestion-residence/residence-details/residence.service";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';


registerLocaleData(localeFr);

@Component({
  selector: 'app-user-detait-admins',
  standalone: true,
    imports: [
        DatePipe,
        NgForOf
    ],
  templateUrl: './user-detait-admins.component.html',
  styleUrl: './user-detait-admins.component.css',
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ]
})
export class UserDetaitAdminsComponent implements OnInit{

  user: any;

  constructor(
    private userService: UserService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}



  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;

      const personSubscription = this.personService.getAdminById(idParam).subscribe(
        data => {
          if (data) {
            this.user = data;
          }
        },
        error => console.error('Erreur lors de la récupération du locataire', error)
      );


    }


  }

}
