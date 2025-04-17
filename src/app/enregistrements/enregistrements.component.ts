import { Component } from '@angular/core';
import { PersonService } from '../shared/Services/person.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enregistrements',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './enregistrements.component.html',
  styleUrls: ['./enregistrements.component.css']  // Correction: "styleUrls" au pluriel
})
export class EnregistrementsComponent {

  selectedType: string = 'Admin';  // Définit par défaut sur 'Admin'

  utilisateur: any = {};  // Objet utilisateur à enregistrer


  constructor(private personService: PersonService) {}

  enregistrerUtilisateur() {
    console.log(this.selectedType);
    if (this.selectedType === 'Admin') {
      this.personService.saveAdmin(this.utilisateur).subscribe(
        (response) => console.log('Admin enregistré', response),
        (error) => console.error('Erreur:', error)
      );
    } else if (this.selectedType === 'locataire') {
      this.personService.saveLocataire(this.utilisateur).subscribe(
        (response) => console.log('Locataire enregistré', response),
        (error) => console.error('Erreur:', error)
      );
    }
    }
    }



