import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { BodyComponent } from '../body/body.component';


interface SideNavToggle{
  screenWidth : number;
  collapsed : boolean;
}
@Component({
  selector: 'app-gestionnaire',
  standalone: true,
  imports: [SidenavComponent,BodyComponent],
  templateUrl: './gestionnaire.component.html',
  styleUrl: './gestionnaire.component.css'
})
export class GestionnaireComponent {

  isSideNavCollasped = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle) : void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollasped = data.collapsed;

  }

}
