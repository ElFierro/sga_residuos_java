import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  createReport(report: ReportPoint): Observable<ReportPoint> {
    return this.http.post<ReportPoint>(environment.apiEndpoints.reportsService, report);
  }

  getReports(email?: string): Observable<any[]> {
    let params = new HttpParams();
    if (email) {
      params = params.set('email', email);
    }
    return this.http.get<any[]>(environment.apiEndpoints.reportsService, { params });
  }

  updateReportStatus(reportId: number, newStatus: string): Observable<any> {
    return this.http.put<any>(environment.apiEndpoints.reportsService+reportId, { status: newStatus });
  }

  deleteReport(reportId: string): Observable<any> {
    const deleteUrl = environment.apiEndpoints.reportsService+reportId;
    return this.http.delete<any>(deleteUrl);
  }

}
