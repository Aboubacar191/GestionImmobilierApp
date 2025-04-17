import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { BodyComponent } from '../body/body.component';


interface SideNavToggle{
  screenWidth : number;
  collapsed : boolean;
}

@Component({
  selector: 'app-administrateur',
  standalone: true,
  imports: [SidenavComponent,RouterModule,BodyComponent],
  templateUrl: './administrateur.component.html',
  styleUrl: './administrateur.component.css'
})
export class AdministrateurComponent {


  isSideNavCollasped = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle) : void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollasped = data.collapsed;

  }


}
