import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterEmailPipe } from '../../../pipes/filter-email.pipe';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { ModalService } from '../../../services/modal.service';
import { WasteModalComponent } from '../waste-modal/waste-modal.component';
import { WasteService } from '../../../services/waste.service';
import { CommunicationService } from '../../../services/comunication.service';
import { WasteChartComponent } from "../waste-chart/waste-chart.component";

@Component({
    selector: 'app-waste-list',
    standalone: true,
    templateUrl: './waste-list.component.html',
    styleUrl: './waste-list.component.css',
    imports: [
        DatePipe,
        RouterModule,
        NgxPaginationModule,
        NgFor,
        NgIf,
        FilterEmailPipe,
        FormsModule,
        WasteModalComponent,
        WasteChartComponent
    ]
})
export class WasteListComponent implements OnInit {
  private wasteService = inject(WasteService);
 
   //Busqueda dinamica
  filterTable: any = '';

  //Paginacion
  page: number = 1;
  numberOfLines: number = 10;
  totalWaste: any;

  //Almacena la lista de residuos
  waste: any;

  userRole: string = '';
  userEmail: string = '';

  ngOnInit(): void {
    this.userRole = "Usuario";
    this.loadAll(); // Carga todos los residuos al inicializar el componente
   
    this.communicationService.dataUpdated$.subscribe(() => {
      this.loadAll();
    });
  }

  constructor(private modalService: ModalService, private communicationService: CommunicationService) {}

  // Llama la petición para eliminar un residuos
  deleteWaste(id: string) {
    this.wasteService.delete(id).subscribe({
      next: () => {
        console.log(`Waste with id ${id} deleted`);
        this.loadAll(); // Recarga la lista de rediuos después de eliminar
      },
      error: (err: any) => {
        console.error(`Failed to delete waste with id ${id}`, err);
      },
    });
  }

  //Carga la lista de residuos
  loadAll() {
    const email = this.userRole === 'empleado' ? this.userEmail : undefined;
    this.wasteService.list(email ).subscribe({
      next: (response: any) => {
        const { data } = response;
        if (data) {
          this.waste = data;
          this.totalWaste = data.length; 
        }
      },
      error: (err: any) => {
        console.error('Failed to load waste', err);
      },
    });
  }

  // Obtiene el índice de inicio para la paginación
  getStartIndex(currentPage: number, lastPage: number): string {
    if (currentPage !== lastPage || (currentPage > 0 && lastPage > 0)) {
      return ((this.numberOfLines * (currentPage - 1)) + 1).toString();
    }
    return '1';
  }

  // Obtiene el índice final para la paginación
  getLastIndex(currentPage: number, lastPage: number): number | null {
    if (currentPage !== lastPage) {
      return this.numberOfLines * currentPage;
    }
    return this.waste ? this.waste.length : null;
  }

  // Confirma y elimina un registro de residuos
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
          `Residuo ha eliminado`,
          'success'
        );
      }
    });
  }

 

  openModal(wasteId?: string) {
    this.modalService.openModal('wasteModal',wasteId);
  }
}


