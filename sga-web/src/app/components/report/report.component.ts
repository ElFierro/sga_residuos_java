import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ModalService } from '../../services/modal.service';
import { CommunicationService } from '../../services/comunication.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor, NgIf } from '@angular/common';
import { FilterEmailPipe } from '../../pipes/filter-email.pipe';
import { AuthService } from '../../services/auth.service';
import { BannerComponent } from "../banner/banner.component";

interface Report {
  direccion: string;
  correoElectronico: string;
  descripcion: string;
  status: string;
}

@Component({
    selector: 'app-report',
    standalone: true,
    templateUrl: './report.component.html',
    styleUrl: './report.component.css',
    imports: [RouterModule,
        NgxPaginationModule,
        NgFor,
        FilterEmailPipe,
        FormsModule,
        NgIf, BannerComponent]
})
export default class ReportComponent implements OnInit {
  filterTable = '';
  reports: Report[] = [];
  page: number = 1;
  numberOfLines: number = 10;
  statusList: string[] = ['Pendiente', 'En revisión', 'Completado'];
  userLoginOn:boolean=false;
  isUser: boolean = false;
 isAdmin: boolean = false;
 userEmail: string ='';
  constructor(
    private reportService: ReportService,
  private authService: AuthService) {}
  ngOnInit(): void {
  

    this.authService.userLoginOn.subscribe((userLoginOn) => {
      this.userLoginOn = userLoginOn;
      if (!userLoginOn) { // Reiniciar roles si no hay sesión activa
        this.isAdmin = false;
        this.isUser = false;
      }
    });
  
    this.authService.userRole.subscribe((role) => {
      this.isAdmin = role === 'Administrador';
      this.isUser = role === 'Usuario';
    });

    this.authService.userEmail.subscribe((email) => {
      this.userEmail = email; 
  });
  this.getReports();
  }

  downloadReport() {
    Swal.fire({
      title: 'Generando reporte',
      html: 'Por favor espera...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    // Lógica para descargar el reporte
    this.reportService.downloadCollectionPointsReport().subscribe((response: Blob) => {
      // Crear el enlace de descarga
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'collection_points_report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      // Cerrar SweetAlert2 después de descargar el reporte
      Swal.close();
    }, error => {
      // En caso de error, cerrar SweetAlert2 y mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error al generar el reporte',
        text: 'Por favor intenta de nuevo más tarde.'
      });
    });
  }

  getReports(): void {
    const email = this.isUser ? this.userEmail : undefined;
    this.reportService.getReports(email).subscribe({
      next: (response: Report[]) => {
        this.reports = response;
      },
      error: (error) => {
        console.error('Error fetching reports: ', error);
      }
    });
  }


  confirmDeleteReport(reportId: string, email: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¡No podrás revertir esto! Eliminarás el reporte del usuario: ${email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reportService.deleteReport(reportId).subscribe(
          () => {
            Swal.fire('¡Eliminado!', 'El reporte ha sido eliminado correctamente.', 'success');
            this.getReports();
          },
          (error: any) => {
            console.error('Error deleting report: ', error);
            Swal.fire('¡Error!', 'Ha ocurrido un error al eliminar el reporte.', 'error');
          }
        );
      }
    });
  }

  updateReportStatus(report: any) {
    // Mostrar SweetAlert2 de "Actualizando estado"
    Swal.fire({
      title: 'Actualizando estado',
      html: 'Por favor espera...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    // Llamar al servicio para actualizar el estado
    this.reportService.updateReportStatus(report.id, report.status).subscribe(() => {
      // Cerrar SweetAlert2 después de actualizar el estado
      Swal.close();
  
      // Mostrar notificación de éxito
      Swal.fire({
        icon: 'success',
        title: 'Estado actualizado',
        text: 'El estado se ha actualizado exitosamente.'
      });
    }, error => {
      // Cerrar SweetAlert2 en caso de error
      Swal.close();
  
      // Mostrar notificación de error
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el estado',
        text: 'Hubo un problema al actualizar el estado. Por favor, intenta de nuevo más tarde.'
      });
  
      console.error('Error al actualizar el estado:', error);
    });
  }
}