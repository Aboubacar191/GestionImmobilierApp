import { Component, EventEmitter, HostListener, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { navbarData2 } from './nav-data2';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SomeComponent } from "../some/some.component";
import { Auth2Service } from '../login/auth2.service';
import { PersonService } from '../shared/Services/person.service';




interface SideNavToggle{
  screenWidth : number;
  collapsed : boolean;
}

@Component({
  selector: 'app-sidenav2',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, SomeComponent],
  templateUrl: './sidenav2.component.html',
  styleUrl: './sidenav2.component.css',


})


export class Sidenav2Component implements OnInit , OnChanges {



  @Output()
  onToggleSideNav2: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData2 = navbarData2;
  utilisateur: any = {};

  // Variables pour stocker l'ID et le TypeUser
  userId: string | null = null;
  userType: string | null = null;

  constructor(private auth2Service: Auth2Service, private PersonService: PersonService) {}




  @HostListener('window:resize',['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav2.emit({collapsed: this.collapsed, screenWidth:this.screenWidth});
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    // Récupérer l'id et le type d'utilisateur depuis le localStorage

    this.userId = localStorage.getItem('ID');
    this.userType = localStorage.getItem('typeUser');

    // Afficher les informations dans la console (pour vérifier)

    if(this.userId){
      if(this.userType == 'Locataire'){
        this.PersonService.getLocataireById(this.userId).subscribe(
          (data) => {
            this.utilisateur = data; // Assigner les techniciens au tableau AllTechniciens
          },
          (error) => {
            console.error('Erreur lors de la récupération du locataire', error);
          }
        )
        console.log(this.utilisateur);

      }
    }

  }



  ngOnChanges(changes: SimpleChanges): void {

  }

  toggleCollapse() : void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav2.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav():void {
    this.collapsed = false;
    this.onToggleSideNav2.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
