import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coordinate, Route } from '../models/route.interface';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private baseUrl = 'http://localhost:8080/api/routes'; // Cambia la URL base según tu configuración

  constructor(private http: HttpClient) { }

  createRoute(route: Route): Observable<Route> {
    return this.http.post<Route>(this.baseUrl, route);
  }

  getAllRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.baseUrl);
  }

  getRouteById(id: string): Observable<Route> {
    return this.http.get<Route>(`${this.baseUrl}/${id}`);
  }

  addCoordinateToRoute(id: string, coordinate: Coordinate): Observable<Route> {
    return this.http.post<Route>(`${this.baseUrl}/${id}/coordinates`, coordinate);
  }

  removeCoordinateFromRoute(routeId: string, coordinateId: string): Observable<Route> {
    return this.http.delete<Route>(`${this.baseUrl}/${routeId}/coordinates/${coordinateId}`);
  }

  deleteRoute(routeId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${routeId}`);
  }
  
}
