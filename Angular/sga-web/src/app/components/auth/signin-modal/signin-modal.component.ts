import { Component, OnInit, inject } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { ModalService } from '../../../services/modal.service';
import SignupComponent from '../signup-modal/signup-modal.component';

@Component({
  selector: 'app-signin-modal',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf, SignupComponent],
  templateUrl: './signin-modal.component.html',
  styleUrl: './signin-modal.component.css'
})
export class SigninComponent implements OnInit {

  private fb = inject(FormBuilder); // Inyecta FormBuilder para manejar formularios reactivos
  private modalId = 'signin'; // Identificador único para este modal

  form?: FormGroup; // Formulario reactivo
  showModal: boolean = false; // Estado de visibilidad del modal
  isSaving: boolean = false; // Estado para controlar si se está guardando

  constructor(public modalService: ModalService) {
    // Suscripción al observable showModal$ para controlar la visibilidad del modal
    this.modalService.isModalOpen$(this.modalId).subscribe(show => {
      this.showModal = show;
    });
  }

  ngOnInit() {
    // Inicializa el formulario vacío
    this.initializeForm();
  }

  initializeForm() {
    // Inicializa un formulario vacío
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  save() {
    // Método para guardar el formulario de inicio de sesión
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Deshabilita el botón mientras se realiza la operación
    this.isSaving = true;

    const loginData = this.form!.value;

    // Simula una petición al servidor
    setTimeout(() => {
      this.isSaving = false;
      this.handleSuccess('Inicio de sesión exitoso');
      this.toggleModal(); // Cierra el modal después de iniciar sesión
    }, 1500);
  }

  private handleSuccess(message: string) {
    // Muestra un mensaje de éxito usando SweetAlert2
    Swal.fire({
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500
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
      email: '',
      password: ''
    });
  }

  openSignUpModal() {
    this.modalService.openModal('signup');
  }
}