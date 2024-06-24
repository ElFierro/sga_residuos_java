import { Component } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  constructor(private reportService: ReportService) {}

  downloadReport() {
    this.reportService.downloadCollectionPointsReport().subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'collection_points_report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}