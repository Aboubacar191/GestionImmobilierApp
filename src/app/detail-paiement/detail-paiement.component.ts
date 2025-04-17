import {Component, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe} from "@angular/common";
import {UserService} from "../shared/Services/user.service";
import {PersonService} from "../shared/Services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResidenceService} from "../gestion-residence/residence-details/residence.service";

@Component({
  selector: 'app-detail-paiement',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './detail-paiement.component.html',
  styleUrl: './detail-paiement.component.css'
})
export class DetailPaiementComponent implements OnInit{



  constructor(
    private userService: UserService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}
  paiement: any = {

  };

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;

      const personSubscription = this.userService.getPaiementById(id).subscribe(
        data => {
          if (data) {
            this.paiement = data;
          }
        },
        error => console.error('Erreur lors de la récupération du paiement', error)
      );


    }
  }

}
