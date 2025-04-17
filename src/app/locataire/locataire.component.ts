import { Component } from '@angular/core';
import { Sidenav2Component } from '../sidenav2/sidenav2.component';
import { BodyComponent } from '../body/body.component';
import { RouterModule } from '@angular/router';


interface SideNavToggle{
  screenWidth : number;
  collapsed : boolean;
}

@Component({
  selector: 'app-locataire',
  standalone: true,
  imports: [Sidenav2Component,BodyComponent,RouterModule],
  templateUrl: './locataire.component.html',
  styleUrl: './locataire.component.css'
})
export class LocataireComponent {

  isSideNavCollasped = false;
  screenWidth = 0;

  onToggleSideNav2(data2: SideNavToggle) : void{
    this.screenWidth = data2.screenWidth;
    this.isSideNavCollasped = data2.collapsed;

  }
}
