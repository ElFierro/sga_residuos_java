import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.userRole.pipe(
      map(role => {
        if (role && role === 'administrador') {
          return true; // Permitir acceso si el rol es 'administrador'
        } else {
          this.router.navigate(['/home']); // Redirigir a la página de inicio si no es 'administrador'
          return false;
        }
      })
    );
  }
}
