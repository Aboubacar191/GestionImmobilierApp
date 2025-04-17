import { Routes } from '@angular/router';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { GestionnaireComponent } from './gestionnaire/gestionnaire.component';
import { LocataireComponent } from './locataire/locataire.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionLocataireComponent } from './gestion-locataire/gestion-locataire.component';
import { GestionMaintenanceComponent } from './gestion-maintenance/gestion-maintenance.component';
import { GestionPaiementComponent } from './gestion-paiement/gestion-paiement.component';
import { GestionPersonnelComponent } from './gestion-personnel/gestion-personnel.component';
import { GestionResidenceComponent } from './gestion-residence/gestion-residence.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { EnregistrementsComponent } from './enregistrements/enregistrements.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ResidenceDetailsComponent } from './gestion-residence/residence-details/residence-details.component';
import {UserDetaitAdminsComponent} from "./UserdetailAdmins/user-detait-admins/user-detait-admins.component";
import {DetailPaiementComponent} from "./detail-paiement/detail-paiement.component";
import {DetailsMaintenanceComponent} from "./details-maintenance/details-maintenance.component";

export const routes: Routes = [
  {path : 'Login' , component : LoginComponent},
  {path : '' , redirectTo : 'Login', pathMatch : 'full'},
  {path:'Admin', component:AdministrateurComponent,
    children: [
      {path : '' , redirectTo : 'Dashboard', pathMatch : 'full'},
      {path : 'Dashboard' , component : DashboardComponent},
      {path : 'gestion-locataire' , component : GestionLocataireComponent},
      {path : 'gestion-maintenance' , component : GestionMaintenanceComponent},
      {path : 'gestion-paiement' , component : GestionPaiementComponent},
      {path : 'gestion-personnel' , component : GestionPersonnelComponent},
      {path : 'gestion-residence' , component : GestionResidenceComponent},
      {path : 'gestion-personnel/enregistrement', component : EnregistrementsComponent},
      { path: 'gestion-residence/:id', component: ResidenceDetailsComponent },
      { path: 'gestion-personnel/:id', component: UserDetaitAdminsComponent },
      { path: 'gestion-locataire/:id', component: UserDetailsComponent },
      { path: 'gestion-paiement/:id', component: DetailPaiementComponent },
      { path: 'gestion-maintenance/:id', component: DetailsMaintenanceComponent }


    ]
  },
  {path:'Gestionnaire', component:GestionnaireComponent ,
    children: [
      {path : '' , redirectTo : 'Dashboard', pathMatch : 'full'},
      {path : 'Dashboard' , component : DashboardComponent,  runGuardsAndResolvers: 'always'},
      {path : 'gestion-locataire' , component : GestionLocataireComponent},
      {path : 'gestion-maintenance' , component : GestionMaintenanceComponent},
      {path : 'gestion-paiement' , component : GestionPaiementComponent},
      {path : 'gestion-residence' , component : GestionResidenceComponent},
      { path: 'user/:id', component: UserDetailsComponent },
      { path: 'gestion-residence/:id', component: ResidenceDetailsComponent },
      { path: 'gestion-locataire/:id', component: UserDetailsComponent }


    ]},
  {path:'DLocataire', component:LocataireComponent ,
    children: [
      {path : '' , redirectTo : 'dashboard', pathMatch : 'full'},
      {path : 'dashboard' , component : Dashboard2Component},
      {path : 'gestion-maintenance' , component : GestionMaintenanceComponent},
      {path : 'gestion-paiement' , component : GestionPaiementComponent}

    ]},




];
