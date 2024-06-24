import { Component, OnInit } from '@angular/core';
import { ReportUserService } from '../../services/user-reports.service';
import { Report_interface } from '../../models/report_interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterEmailPipe } from '../../pipes/filter-email.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-my-report',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    FilterEmailPipe,
    FormsModule,
    RouterModule
  ],
  templateUrl: './check-my-report.component.html',
  styleUrl: './check-my-report.component.css'
})
export class CheckMyReportComponent implements OnInit {
  filterTable: any = '';
  page: number = 1;
  numberOfLines: number = 10;
  report: Report_interface[] = [];
  searchTerm: string = '';

  constructor(private reportService: ReportUserService) { }

  ngOnInit(): void {
      
  }

  searchReportsByUser(): void {
    if (this.searchTerm.trim()) {
      this.reportService.searchReportsByUserServi(this.searchTerm).subscribe({
        next: (data: Report_interface[]) => {
          this.report = data;
          if (this.report.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'Oops..No se encontraron reportes.',
              text: 'Usuario no tiene reportes creados',
            });
          }
        },
        error: (error) => {
          console.error('Error al buscar reportes por usuario', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
          });
        }
      });
    } else {
      console.warn('El nombre de usuario no puede estar vacío.');
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'El nombre de usuario no puede estar vacío.'
      });
    }
  }

  getStartIndex(currentPage: number): number {
    return (this.numberOfLines * (currentPage - 1)) + 1;
  }

  getLastIndex(currentPage: number): number {
    const lastIndex = this.numberOfLines * currentPage;
    return lastIndex > this.report.length ? this.report.length : lastIndex;
  }



}
