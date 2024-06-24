import { Pipe, PipeTransform } from '@angular/core';
import { Report_interface } from '../models/report_interface';

@Pipe({
  name: 'filterEmail',
  standalone: true
})
export class FilterEmailPipe implements PipeTransform {

  transform(reportes: Report_interface[], filterTable: string): Report_interface[] {
    if (!reportes || !filterTable) {
      return reportes;
    }
    return reportes.filter(reporte => 
      reporte.username && reporte.username.toLowerCase().includes(filterTable.toLowerCase())
    );
  }
}

