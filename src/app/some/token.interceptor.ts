import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core'; // Injecteur manuel
import { Router } from '@angular/router';




export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router); // Injection manuelle du service Router


  const token = localStorage.getItem('token'); // Exemple : récupération du token depuis localStorage
  if( token !== null){

    // Clonage de la requête pour ajouter le token dans les en-têtes
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return next(authReq).pipe(
      catchError(error => {


        if(error.status === 403 || error.statuts === 401){
          localStorage.removeItem('token');
          localStorage.removeItem('typeUser');
          localStorage.removeItem('ID');
          router.navigate(['Login']); // Utilisation de router.navigate pour rediriger
        }
        return throwError('Session Expiré')
      })
    );
  }

  return next(req);
};
