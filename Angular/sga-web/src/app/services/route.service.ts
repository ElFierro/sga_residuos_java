import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coordinate, Route } from '../models/route.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  

  constructor(private http: HttpClient) { }

  createRoute(route: Route): Observable<Route> {
    return this.http.post<Route>(environment.apiEndpoints.routesService, route);
  }

  getAllRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(environment.apiEndpoints.routesService);
  }

  getRouteById(id: string): Observable<Route> {
    return this.http.get<Route>(environment.apiEndpoints.routesService+id);
  }

  addCoordinateToRoute(id: string, coordinate: Coordinate): Observable<Route> {
    return this.http.post<Route>(environment.apiEndpoints.routesService+id+'/coordinates', coordinate);
  }

  removeCoordinateFromRoute(routeId: string, coordinateId: string): Observable<Route> {
    return this.http.delete<Route>(environment.apiEndpoints.routesService+routeId+'/coordinates/'+coordinateId);
  }

  deleteRoute(routeId: string): Observable<void> {
    return this.http.delete<void>(environment.apiEndpoints.routesService+routeId);
  }
  
}
