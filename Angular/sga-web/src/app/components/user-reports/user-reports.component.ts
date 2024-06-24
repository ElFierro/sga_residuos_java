import { Component, OnInit } from '@angular/core';
import { ReportUserService } from '../../services/user-reports.service';
import { Report_interface } from '../../models/report_interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterEmailPipe } from '../../pipes/filter-email-report.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-user-reports',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    FilterEmailPipe,
    FormsModule,
    RouterModule],
  templateUrl: './user-reports.component.html',
  styleUrl: './user-reports.component.css'
})
export class UserReportsComponent implements OnInit {
  filterTable: any = '';
  page: number = 1;
  numberOfLines: number = 10;
  reportes: Report_interface[] = [];


  constructor(private reportsUserService: ReportUserService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportsUserService.list().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.reportes = data;
      } else if (typeof data === 'object') {
        this.reportes = Object.values(data); // Convertir objeto a array
      } else {
        console.error('Los datos recibidos no son válidos:', data);
      }
    });
  }

  getStartIndex(currentPage: number): number {
    return (this.numberOfLines * (currentPage - 1)) + 1;
  }

  getLastIndex(currentPage: number): number {
    const lastIndex = this.numberOfLines * currentPage;
    return lastIndex > this.reportes.length ? this.reportes.length : lastIndex;
  }

  updateReportStatus(report: Report_interface): void {
    this.reportsUserService.updateReport(report.id, report).subscribe({
      next: (updatedReport: Report_interface) => {
        Swal.fire(
          'Estado actualizado',
          'El estado del reporte ha sido actualizado exitosamente.',
          'success'
        );
        this.loadReports();
      },
      error: (error: any) => {
        Swal.fire(
          'Error',
          'Hubo un error al actualizar el estado.',
          'error'
        );
        console.error('Error al actualizar el estado:', error);
      }
    });
  }

  openUpdateStatusModal(report: Report_interface): void {
    Swal.fire({
      title: 'Actualizar estado',
      input: 'select',
      inputOptions: {
        'Pendiente': 'Pendiente',
        'En Progreso': 'En Progreso',
        'Completado': 'Completado'
      },
      inputPlaceholder: 'Selecciona el nuevo estado',
      showCancelButton: true,
      inputValue: report.report_status
    }).then((result) => {
      if (result.isConfirmed) {
        report.report_status = result.value;
        this.updateReportStatus(report);
      }
    });
  }

  deleteReport(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reportsUserService.deleteReport(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'El reporte ha sido eliminado.', 'success');
            this.loadReports(); // Recargar los reportes para ver los cambios
          },
          error: (err) => {
            Swal.fire('Error', 'Hubo un error al eliminar el reporte.', 'error');
            console.error('Error al eliminar el reporte:', err);
          }
        });
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'estado-pendiente';
      case 'En Progreso':
        return 'estado-en-progreso';
      case 'Completado':
        return 'estado-completado';
      default:
        return '';
    }
  }

}
