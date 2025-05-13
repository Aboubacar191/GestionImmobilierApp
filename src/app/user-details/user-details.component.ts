import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../shared/Services/user.service';
import { PersonService } from '../shared/Services/person.service';
import { ResidenceService } from "../gestion-residence/residence-details/residence.service";
import { Subscription } from 'rxjs';  // Importation pour gérer les abonnements
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';


registerLocaleData(localeFr);


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ]
})
export class UserDetailsComponent implements OnInit {
  user: any;
  Allmaintenance: any[] = [];
  filteredMaintenance: any[] = [];
  private subscriptions: Subscription[] = [];  // Tableau pour gérer les abonnements

  constructor(
    private userService: UserService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}

  // Méthode pour trier les maintenances par locataire
  filterMaintenanceByLocataire(idParam: number): void {
    if (this.Allmaintenance && this.Allmaintenance.length > 0) {
      this.filteredMaintenance = this.Allmaintenance.filter((maintenance: any) =>
        maintenance.locataire?.id === idParam
      );
      console.log('Liste des maintenances filtrées:', this.filteredMaintenance);
    } else {
      console.error('La liste des maintenances est vide ou non définie.');
    }
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;

      const personSubscription = this.personService.getLocataireById(idParam).subscribe(
        data => {
          if (data) {
            this.user = data;

            // Trier les paiements par date décroissante (du plus récent au plus ancien)
            if (this.user.paiementList) {
              this.user.paiementList.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
            }

            // Trier les maintenances par date décroissante (du plus récent au plus ancien)
            if (this.user.maintenanceList) {
              this.user.maintenanceList.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
            }
          }
        },
        error => console.error('Erreur lors de la récupération du locataire', error)
      );

      const maintenanceSubscription = this.userService.getAllMaintenances().subscribe(
        data => {
          this.Allmaintenance = data;
          this.filterMaintenanceByLocataire(id);
        },
        error => console.error('Erreur lors de la récupération des maintenances', error)
      );

      this.subscriptions.push(personSubscription, maintenanceSubscription);
    } else {
      console.error('ID utilisateur non valide');
    }
  }



  retour(): void {
    this.router.navigate(['/liste-personnels']);
  }

  ngOnDestroy(): void {
    // Annulation des abonnements pour éviter les fuites de mémoire
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected readonly onlanguagechange = onlanguagechange;
}
