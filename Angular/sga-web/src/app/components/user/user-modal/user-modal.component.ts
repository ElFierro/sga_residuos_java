import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.interface';
import { NgFor,NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { MyValidations } from '../../../utils/my-validations';
import 'sweetalert2/src/sweetalert2.scss';
import { ModalService } from '../../../services/modal.service';
import { CommunicationService } from '../../../services/comunication.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export default class UserFormComponent implements OnInit {

  // Inyección de dependencias
  private fb = inject(FormBuilder); // Inyecta FormBuilder para crear formularios
  private userService = inject(UserService); // Inyecta UserService para interactuar con la API
  private modalId = 'userModal'; // Identificador único para este modal

  // Define la colección de valores válidos para el email
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  form?: FormGroup; // Formulario reactivo
  user?: User; // Usuario actual
  roles?: any; // Lista de roles
  errors: string[] = []; // Lista de errores
  idUser?: any; // ID del usuario
  showModal: boolean = false; // Estado de visibilidad del modal
  isSaving: boolean = false; // Estado para controlar si se está guardando

  constructor(public modalService: ModalService, private communicationService: CommunicationService) {
    // Suscripción al observable wasteId$ para actualizar el formulario cuando cambie wasteId
    this.modalService.getWasteId$(this.modalId).subscribe(id => {
      this.idUser = id;
      this.initializeForm();
    });
  }


  ngOnInit() {
    // Suscripción al observable showModal$ para controlar la visibilidad del modal
    this.modalService.isModalOpen$(this.modalId).subscribe(show => {
      this.showModal = show;
    });

    this.loadAllRoles(); 
  }


  initializeForm() {

    // Si hay un ID, se carga el usuario y se inicializa el formulario con sus datos
    if (this.idUser) {
      this.userService.get(this.idUser)
        .subscribe((user: any) => {
          this.user = user;
          this.form = this.fb.group({
            id: [user.data.id, [Validators.required]],
            name: [user.data.name, [Validators.required,
              Validators.minLength(10),
              Validators.maxLength(30),
              Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
            email: [user.data.email, [Validators.required,
              Validators.pattern(this.emailPattern)],
              MyValidations.validateEmailWithIdUser(this.userService, this.idUser)],
            city: [user.data.city, [Validators.required]],
            rol: [user.data.rol, [Validators.required]]
          });
        });
    } else {
      // Si no hay ID, se inicializa el formulario vacío
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30), Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
        email: [''.toLowerCase(), [Validators.required,
          Validators.pattern(this.emailPattern)],
          MyValidations.validateEmail(this.userService)],
        city: ['', [Validators.required]],
        rol: ['', [Validators.required]]
      });
    }
  }

  save() {
    // Método para guardar un residuo
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Mostrar alerta de carga
    Swal.fire({
      
      title: 'Guardando usuario ...',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false
    });
  
    // Deshabilita el botón mientras se realiza la operación
    this.isSaving = true;
  
    const userModal = this.form!.value;
    const request = this.user ? this.userService.update(userModal.id, userModal) : this.userService.create(userModal);
  
    request.pipe(
      finalize(() => {
        this.isSaving = false; // Vuelve a habilitar el botón después de completar la operación
        Swal.close(); // Cerrar el SweetAlert de carga
      })
    ).subscribe({
      next: () => {
        const message = this.user ? 'Se actualizó el usuario' : 'Se creó el nuevo usuario';
        this.handleSuccess(message);
        this.toggleModal(); // Cierra el modal después de actualizar o crear
        this.communicationService.notifyDataUpdated();
      },
      error: response => {
        this.handleError(response);
        this.isSaving = false; // Vuelve a habilitar el botón en caso de error
        Swal.close(); // Cerrar el SweetAlert de carga en caso de error
      }
    });
  }
  
  private handleError(response: any) {
    // Maneja errores y muestra el mensaje de error
    this.errors = [response.error.responseDetails.message];
    console.error(this.errors);
  }

  private handleSuccess(message: string) {
    // Muestra un mensaje de éxito usando SweetAlert2
    Swal.fire({
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
    this.errors = [];
  }

  // Carga todos los roles desde el servicio
  loadAllRoles() {
    this.userService.listRoles().subscribe({
      next: (response: any) => {
        const { data } = response;
        if (data) {
          this.roles = data;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  toggleModal() {
    // Abre o cierra el modal y resetea el formulario si se cierra
    if (this.showModal) {
      this.modalService.closeModal(this.modalId);
      this.resetForm();
    } else {
      this.modalService.openModal(this.modalId);
    }
  }

  private resetForm() {
    // Resetea el formulario a su estado inicial
    this.form?.reset({
      name: '',
      email: '',
      city: '',
      rol: ''
    });
    this.user = undefined;
  }
}
