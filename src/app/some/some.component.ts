import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-some',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './some.component.html',
  styleUrl: './some.component.css'
})
export class SomeComponent {

  @Input()
  collapsed2 = false;



  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout(); // Suppression des données d'authentification
    this.router.navigate(['/Login']); // Redirection vers la page de connexion
  }




}
