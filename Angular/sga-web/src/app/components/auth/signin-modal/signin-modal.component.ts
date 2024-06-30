import { Component, OnInit, inject } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { ModalService } from '../../../services/modal.service';
import SignupComponent from '../signup-modal/signup-modal.component';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/loginRequest';

@Component({
  selector: 'app-signin-modal',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf, SignupComponent],
  templateUrl: './signin-modal.component.html',
  styleUrl: './signin-modal.component.css'
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  showModal: boolean = false;
  isSaving: boolean = false;
  loginError:string="";


  constructor(private fb: FormBuilder, public modalService: ModalService, private authService: AuthService) {
    this.modalService.isModalOpen$('signin').subscribe(show => {
      this.showModal = show;
    });
  }

  ngOnInit() {
  }

  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  })

  login() {
    if (this.loginForm.valid) {
      this.loginError = "";
      // Mostrar animación de carga
      Swal.fire({
        title: 'Iniciando sesión...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false
      });

      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData;
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: errorData,
            showConfirmButton: true
          });
        },
        complete: () => {
          this.toggleModal();
          console.info("Login completo");
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Error en los datos',
        text: 'Por favor, completa todos los campos correctamente.',
        showConfirmButton: true
      });
    }
  }
  

  toggleModal() {
    if (this.showModal) {
      this.modalService.closeModal('signin');
      this.resetForm();
    } else {
      this.modalService.openModal('signin');
    }
  }

  private resetForm() {
    this.form?.reset({
      email: '',
      password: ''
    });
  }

  openSignUpModal() {
    this.modalService.openModal('signup');
  }
}