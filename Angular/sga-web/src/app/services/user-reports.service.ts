import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report_interface } from '../models/report_interface';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportUserService {

  private apiUrl = 'http://localhost:5002/reportes';

  constructor(private http: HttpClient) { }

  list(): Observable<Report_interface[]> {
    return this.http.get<Report_interface[]>(`${this.apiUrl}/`).pipe(
      tap((data: Report_interface[]) => {
        console.log('Datos recibidos:', data);
      }),
      catchError(error => {
        console.error('Error al obtener los reportes:', error);
        throw error;
      })
    );
  }

  createReport(reporte: Report_interface): Observable<Report_interface> {
    return this.http.post<Report_interface>(`${this.apiUrl}/`, reporte).pipe(
      tap((newReport: Report_interface) => {
        console.log('Reporte creado:', newReport);
      }),
      catchError(error => {
        console.error('Error al crear el reporte:', error);
        throw error;
      })
    );
  }

  checkIfIdExists(id: number): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/check/${id}`).pipe(
      map(response => response.exists),
      catchError(error => {
        console.error('Error al verificar el ID:', error);
        throw error;
      })
    );
  }
  

  searchReportsByUserServi(username: string): Observable<Report_interface[]> {
    let params = new HttpParams().set('username', username);
    return this.http.get<Report_interface[]>(`${this.apiUrl}/buscar_por_usuario`, { params }).pipe(
      tap((data: Report_interface[]) => {
        console.log(`Reportes para el usuario ${username}:`, data);
      }),
      catchError(error => {
        console.error(`Error al buscar reportes para el usuario ${username}:`, error);
        throw error;
      })
    );
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar_reporte_por_id`, { params: new HttpParams().set('id', id) }).pipe(
      tap(() => {
        console.log('Reporte eliminado', id);
      }),
      catchError(error => {
        console.error('Error al eliminar el reporte:', error);
        throw error;
      })
    );
  }

  updateReport(id: number, reporte: Report_interface): Observable<Report_interface> {
    return this.http.put<Report_interface>(`${this.apiUrl}/actualizar_por_id`, reporte, {
      params: new HttpParams().set('id', id)
    }).pipe(
      tap((updatedReport: Report_interface) => {
        console.log('Reporte actualizado:', updatedReport);
      }),
      catchError(error => {
        console.error('Error al actualizar el reporte:', error);
        throw error;
      })
    );
  }
}

