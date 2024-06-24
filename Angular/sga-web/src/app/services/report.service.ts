import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  downloadCollectionPointsReport() {
    return this.http.get(`${this.apiUrl}/collection-points`, {
      responseType: 'blob'
    });
  }
}
