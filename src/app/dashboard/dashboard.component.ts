import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Auth2Service } from '../login/auth2.service';
import { PersonService } from '../shared/Services/person.service';
import { RouterLink } from '@angular/router';

declare var Chart: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

  private chartInstance: any;
  totalResidences: number = 0;
  occupees: number = 0;
  libres: number = 0;
  dashArray: string = '0, 100';
  dashOffset: string = '100'; // Pour animer l'effet de remplissage

  constructor(private auth2Service: Auth2Service, private personService: PersonService) {}

  statistiques = [
    { nom: 'Résidence', valeur: 12, image: 'fa-solid fa-house' },
    { nom: 'Gestionnaire', valeur: 7, image: 'fa-solid fa-user-tie' },
    { nom: 'Admin', valeur: 2, image: 'fa-solid fa-user-tie' },
    { nom: 'Locataire', valeur: 50, image: 'fa-solid fa-users' }
  ];

  taches = [
    { nom: 'Impayé', valeur: '30%' },
    { nom: 'Maintenance', valeur: '10' },
    { nom: 'Payé', valeur: '20%' },
    { nom: 'Dépenses', valeur: '30,000 FCFA' }
  ];

  ngAfterViewInit() {
    this.calculerOccupation();
    this.renderChart();
  }

  calculerOccupation() {
    const residenceStat = this.statistiques.find(stat => stat.nom === 'Résidence');
    this.totalResidences = residenceStat ? residenceStat.valeur : 0;

    if (this.totalResidences > 0) {
      this.occupees = Math.round(this.totalResidences * 0.7);
      this.libres = this.totalResidences - this.occupees;

      const totalCircumference = 2 * Math.PI * 30;
      const occupiedPercentage = (this.occupees / this.totalResidences) * totalCircumference;

      // Ajout d'un léger délai pour animer le changement
      setTimeout(() => {
        this.dashArray = `${occupiedPercentage}, ${totalCircumference}`;
        this.dashOffset = `${100 - (this.occupees / this.totalResidences) * 100}`;
      }, 300);
    } else {
      this.occupees = 0;
      this.libres = 0;
      this.dashArray = '0, 100';
      this.dashOffset = '100';
    }
  }

  renderChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Occupé', 'Libre'],
        datasets: [{
          data: [this.occupees, this.libres],
          backgroundColor: ['#4CAF50', '#FF5733']
        }]
      },
      options: {
        responsive: true,
        animation: {
          animateRotate: true,
          animateScale: true
        },
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}
