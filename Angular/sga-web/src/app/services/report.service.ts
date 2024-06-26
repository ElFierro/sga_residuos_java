import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportPoint } from '../models/report-point.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8383/api/reports';

  constructor(private http: HttpClient) {}

  downloadCollectionPointsReport() {
    return this.http.get(`${this.apiUrl}/collection-points`, {
      responseType: 'blob'
    });
  }

  createCollectionPoint(report: ReportPoint): Observable<ReportPoint> {
    return this.http.post<ReportPoint>(`${this.apiUrl}`, report);
  }
}
