import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const allowedRoles = route.data['allowedRoles'] as Array<string>;

    return this.authService.userRole.pipe(
      map(role => {
        if (allowedRoles.includes(role)) {
          return true; // Permitir acceso si el rol está en la lista de roles permitidos
        } else {
          this.router.navigate(['/home']); // Redirigir a la página de inicio si el rol no está permitido
          return false;
        }
      })
    );
  }
}
