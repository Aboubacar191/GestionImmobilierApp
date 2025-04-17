import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  saveToken(token : string) : void{
    localStorage.setItem('token', token);

  }

  isLogged():boolean{
    const token = localStorage.getItem('token');
    return !! token;
  }

  logout() {
    localStorage.removeItem('token'); // Exemple de suppression du token
    localStorage.removeItem('typeUser');
    localStorage.removeItem('ID');
    
  }



  constructor() { }
}
