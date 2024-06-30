import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { DatePipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterEmailPipe } from '../../../pipes/filter-email.pipe';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { ModalService } from '../../../services/modal.service';
import { CommunicationService } from '../../../services/comunication.service';
import UserFormComponent from '../user-modal/user-modal.component';

@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css',
    imports: [
        DatePipe,
        RouterModule,
        NgxPaginationModule,
        NgFor,
        FilterEmailPipe,
        FormsModule,
        UserFormComponent
    ]
})
export default class UserListComponent implements OnInit {
  private userService = inject(UserService);
 
   //Busqueda dinamica
  filterTable: any = '';

  //Paginacion
  page: number = 1;
  numberOfLines: number = 10;
  totalUser: any;

  //Almacena la lista de usuarios
  users: any;

  constructor(private modalService: ModalService, 
    private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.loadAll(); // Carga todos los usuarios al inicializar el componente
    this.communicationService.dataUpdated$.subscribe(() => {
      this.loadAll();
    });
  }

  // Llama la petición para eliminar un usuario
  deleteUser(id: string) {
    this.userService.delete(id).subscribe({
      next: () => {
        console.log(`User with id ${id} deleted`);
        this.loadAll(); // Recarga la lista de usuarios después de eliminar
      },
      error: (err: any) => {
        console.error(`Failed to delete user with id ${id}`, err);
      },
    });
  }

  //Carga la lista de usuarios
  loadAll() {
    this.userService.list().subscribe({
      next: (response: any) => {
        const { data } = response;
        if (data) {
          this.users = data;
          this.totalUser = data.length; // Actualiza el total de usuarios
        }
      },
      error: (err: any) => {
        console.error('Failed to load users', err);
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
    return this.users ? this.users.length : null;
  }

  // Confirma y elimina un usuario
  confirmDeleteUser(id: string, email: string) {
    Swal.fire({
      title: "<h5 style='color:#ef4444'>Eliminar usuario</h5>",
      text: `¿Está seguro que desea eliminar el usuario ${email}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.deleteUser(id);
        Swal.fire(
          'Eliminado!',
          `El usuario ${email} se ha eliminado`,
          'success'
        );
      }
    });
  }

  openModal(wasteId?: string) {
    this.modalService.openModal('userModal',wasteId);
  }
}


