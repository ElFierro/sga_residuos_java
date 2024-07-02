import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { crossPasswordMatchingValidatior, customPasswordValidator } from './register-custom-validators';
import { UserService } from '../../../services/user.service';
import { MyValidations } from '../../../utils/my-validations';
import { ModalService } from '../../../services/modal.service';
import { RegisterRequest } from '../../../models/registerRequest';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css'],
})
export default class SignupComponent implements OnInit {
  private userService = inject(UserService); // Inyecta el servicio de usuario
  private readonly _formBuilder = inject(NonNullableFormBuilder); // Inyecta el FormBuilder no anulable

  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"; // Patrón de correo electrónico válido
  errors: string[] = []; // Almacena los errores del servicio de usuarios
  changetype: boolean = true; // Estado para mostrar o ocultar las contraseñas
  isSaving: boolean = false; // Estado para controlar si se está guardando
  private modalId = 'signup'; // Identificador único para este modal
  showModal: boolean = false; // Estado de visibilidad del modal

  // Inicializa el grupo de formulario con las propiedades correctas
  formGroup: FormGroup = this._formBuilder.group({
    name: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
      Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')
    ]],
    city: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ], MyValidations.validateEmail(this.userService)],
    password: ['', customPasswordValidator],
    confirmPassword: ['']
  }, {
    validators: crossPasswordMatchingValidatior
  });

  constructor(public modalService: ModalService,
     private authService: AuthService,
     private router: Router) {
    // Suscripción al observable isModalOpen$ para controlar la visibilidad del modal
    this.modalService.isModalOpen$(this.modalId).subscribe(show => {
      this.showModal = show;
    });
  }

  ngOnInit(): void {}

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
    this.formGroup.reset({
      name: '',
      city: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  viewpass() {
    // Cambia el tipo de texto a password y viceversa
    this.changetype = !this.changetype;
  }

  clickRegister(): void {
    // Si algún validador es inválido, retorna los errores
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    // Deshabilita el botón mientras se realiza la operación
    this.isSaving = true;

    const userForm: RegisterRequest = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
      rol: "Usuario",
      city: this.formGroup.value.city,
      name: this.formGroup.value.name
    };

    Swal.fire({
      title: 'Creando usuario...',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false
    });
    this.authService.register(userForm)
    .subscribe({
      next: () => {
        this.errors = [];
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 1500
        });

        this.toggleModal(); // Cierra el modal después de registrar

      },
      error: response => {
        this.errors = response.error.responseDetails.message;
        console.log(this.errors);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: this.errors.join(', '),
          showConfirmButton: true
        });
      },
      complete: () => {
        this.isSaving = false;
      }
    });
}

  // Getters para los campos del formulario
  get nameField(): FormControl<string> {
    return this.formGroup.get('name') as FormControl<string>;
  }

  get cityField(): FormControl<string> {
    return this.formGroup.get('city') as FormControl<string>;
  }

  get emailField(): FormControl<string> {
    return this.formGroup.get('email') as FormControl<string>;
  }

  get passwordField(): FormControl<string> {
    return this.formGroup.get('password') as FormControl<string>;
  }

  get confirmPasswordField(): FormControl<string> {
    return this.formGroup.get('confirmPassword') as FormControl<string>;
  }
}
