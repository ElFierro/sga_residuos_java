import { Component, Input, OnInit, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterEmailPipe } from '../../../pipes/filter-email.pipe';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { ModalService } from '../../../services/modal.service';
import { WasteService } from '../../../services/waste.service';
import { CommunicationService } from '../../../services/comunication.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-waste-table',
  standalone: true,
  templateUrl: './waste-table.component.html',
  styleUrls: ['./waste-table.component.css'],
  imports: [
    DatePipe,
    RouterModule,
    NgxPaginationModule,
    NgFor,
    NgIf,
    FilterEmailPipe,
    FormsModule
  ]
})
export class WasteTableComponent implements OnInit {
  private wasteService = inject(WasteService);
  private modalService = inject(ModalService);
  private communicationService = inject(CommunicationService);
  private authService = inject(AuthService);

  @Input() userLoginOn: boolean = false;
  @Input() isAdmin: boolean = false;
  @Input() isEmploye: boolean = false;
  @Input() isUser: boolean = false;

  filterTable: any = '';
  page: number = 1;
  numberOfLines: number = 10;
  totalWaste: any;
  waste: any;
  userRole: string = '';
  userEmail: string = '';

  ngOnInit(): void {
    this.loadAll();
    
    this.communicationService.dataUpdated$.subscribe(() => {
      this.loadAll();
    });

    this.authService.userLoginOn.subscribe((userLoginOn) => {
      this.userLoginOn = userLoginOn;
      if (!userLoginOn) {
        this.isAdmin = false;
        this.isEmploye = false;
      }
    });

    this.authService.userRole.subscribe((role) => {
      this.isAdmin = role === 'Administrador';
      this.isEmploye = role === 'Empleado';
    });
  }

  deleteWaste(id: string) {
    this.wasteService.delete(id).subscribe({
      next: () => {
        console.log(`Waste with id ${id} deleted`);
        this.loadAll();
      },
      error: (err: any) => {
        console.error(`Failed to delete waste with id ${id}`, err);
      }
    });
  }

  loadAll() {
    const email = this.userRole === 'empleado' ? this.userEmail : undefined;
    this.wasteService.list(email).subscribe({
      next: (response: any) => {
        const { data } = response;
        if (data) {
          this.waste = data;
          this.totalWaste = data.length;
        }
      },
      error: (err: any) => {
        console.error('Failed to load waste', err);
      }
    });
  }

  getStartIndex(currentPage: number, lastPage: number): string {
    if (currentPage !== lastPage || (currentPage > 0 && lastPage > 0)) {
      return ((this.numberOfLines * (currentPage - 1)) + 1).toString();
    }
    return '1';
  }

  getLastIndex(currentPage: number, lastPage: number): number | null {
    if (currentPage !== lastPage) {
      return this.numberOfLines * currentPage;
    }
    return this.waste ? this.waste.length : null;
  }

  confirmDeleteWaste(id: string) {
    Swal.fire({
      title: "<h5 style='color:#ef4444'>Eliminar residuos</h5>",
      text: `¿Está seguro que desea eliminar el registro de residuos?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.deleteWaste(id);
        Swal.fire(
          'Eliminado!',
          `Residuo ha sido eliminado`,
          'success'
        );
      }
    });
  }

  openModal(wasteId?: string) {
    this.modalService.openModal('wasteModal', wasteId);
  }
}
