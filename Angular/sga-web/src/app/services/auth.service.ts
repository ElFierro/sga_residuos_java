import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../models/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserRole: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentUserEmail: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { 
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") !== null);
    this.currentUserRole = new BehaviorSubject<string>(sessionStorage.getItem("role") || "");
    this.currentUserEmail.next(sessionStorage.getItem("email") || "");
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(environment.apiEndpoints.authService + "auth/login", credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          sessionStorage.setItem("token", response.token);
          this.currentUserLoginOn.next(true);

          // Capturar el rol del usuario si está presente en la respuesta
          if (response.role) {
            sessionStorage.setItem("role", response.role);
            this.currentUserRole.next(response.role);
          }
          if (response.email) {
            sessionStorage.setItem("email", response.email);
            this.currentUserEmail.next(response.email);
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("email");
    this.currentUserLoginOn.next(false);
    this.currentUserRole.next("");
    this.currentUserEmail.next("");
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error('El backend ha devuelto un código de estado', error);
    }
    return throwError(() => new Error('Algo falló. Por favor, inténtelo de nuevo.'));
  }

  get userRole(): Observable<string> {
    return this.currentUserRole.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userEmail(): Observable<string> {
    return this.currentUserEmail.asObservable();
  }

  get userToken(): string {
    return sessionStorage.getItem("token") || "";
  }

  getUserEmail(): Observable<string> {
    return this.currentUserEmail.asObservable();
  }
}
