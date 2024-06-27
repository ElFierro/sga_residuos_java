import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportPoint } from '../models/report-point.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {}

  downloadCollectionPointsReport() {
    return this.http.get(environment.apiEndpoints.reportsService+ 'collection-points', {
      responseType: 'blob'
    });
  }

  createCollectionPoint(report: ReportPoint): Observable<ReportPoint> {
    return this.http.post<ReportPoint>(environment.apiEndpoints.reportsService, report);
  }
}
