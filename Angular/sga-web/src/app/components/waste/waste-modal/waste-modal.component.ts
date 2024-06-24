import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { WasteService } from '../../../services/waste.service';
import { ModalService } from '../../../services/modal.service';
import { Waste } from '../../../models/waste.interface';
import { CommunicationService } from '../../../services/comunication.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-waste-modal',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgFor, NgIf], // Importación de módulos
  templateUrl: './waste-modal.component.html',
  styleUrls: ['./waste-modal.component.css']
})
export class WasteModalComponent implements OnInit {

  private fb = inject(FormBuilder); // Inyecta FormBuilder para manejar formularios reactivos
  private wasteService = inject(WasteService); // Inyecta WasteService para interactuar con la API de residuos
  private modalId = 'wasteModal'; // Identificador único para este modal

  form?: FormGroup; // Formulario reactivo
  waste?: Waste; // Objeto de residuo actual
  errors: string[] = []; // Lista de errores
  wasteId?: any; // Identificador del residuo actual
  routes: any[] = []; // Lista de rutas disponibles
  classifications: any[] = []; // Lista de clasificaciones disponibles
  typeWaste: any[] = []; // Lista de tipos de residuos disponibles
  showModal: boolean = false; // Estado de visibilidad del modal
  isSaving: boolean = false; // Estado para controlar si se está guardando

  constructor(
    public modalService: ModalService,
    private communicationService: CommunicationService
  ) {
    // Suscripción al observable wasteId$ para actualizar el formulario cuando cambie wasteId
    this.modalService.getWasteId$(this.modalId).subscribe(id => {
      this.wasteId = id;
      this.initializeForm();
    });
  }

  ngOnInit() {
    // Suscripción al observable showModal$ para controlar la visibilidad del modal
    this.modalService.isModalOpen$(this.modalId).subscribe(show => {
      this.showModal = show;
    });

    // Carga inicial de rutas y clasificaciones
    this.loadAllRoutes();
    this.loadAllClassification();
  }

  initializeForm() {
    // Inicializa el formulario con los datos del residuo actual o vacío
    if (this.wasteId) {
      // Si existe wasteId, carga los datos del residuo y los asigna al formulario
      this.wasteService.get(this.wasteId).subscribe((waste: any) => {
        this.waste = waste;
        this.form = this.fb.group({
          id: [waste.data.id, [Validators.required]],
          typeWaste: [waste.data.typeWaste, Validators.required],
          classification: [waste.data.classification, Validators.required],
          weight: [waste.data.weight, [Validators.required, this.weightValidator]],
          route: [waste.data.route, [Validators.required]]
        });

        // Habilita o deshabilita el campo typeWaste basado en la clasificación seleccionada
        if (waste.data.classification) {
          this.loadAllTypeWaste(waste.data.classification);
          this.form.get('typeWaste')?.enable();
        } else {
          this.form.get('typeWaste')?.disable();
        }

        // Configura el listener para cambios en la clasificación
        this.setupClassificationListener();
      });
    } else {
      // Si no existe wasteId, inicializa un formulario vacío
      this.form = this.fb.group({
        typeWaste: [{ value: '', disabled: true }, Validators.required],
        classification: ['', Validators.required],
        weight: ['', Validators.required],
        route: ['', Validators.required]
      });
      this.setupClassificationListener();
    }
  }

  setupClassificationListener() {
    // Listener para cambios en el campo classification
    this.form?.get('classification')?.valueChanges.subscribe(value => {
      if (value) {
        this.form?.get('typeWaste')?.enable();
        this.loadAllTypeWaste(value);
        this.form?.get('typeWaste')?.setValue('');
      } else {
        this.form?.get('typeWaste')?.disable();
      }
    });
  }

  save() {
    // Método para guardar un residuo
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Deshabilita el botón mientras se realiza la operación
    this.isSaving = true;

    const wasteModal = this.form!.value;
    const request = this.waste ? this.wasteService.update(wasteModal) : this.wasteService.create(wasteModal);

    request.pipe(
      finalize(() => {
        this.isSaving = false; // Vuelve a habilitar el botón después de completar la operación
      })
    ).subscribe({
      next: () => {
        const message = this.waste ? 'Se actualizó el residuo' : 'Se creó el nuevo residuo';
        this.handleSuccess(message);
        this.toggleModal(); // Cierra el modal después de actualizar o crear
        this.communicationService.notifyDataUpdated(); // Notifica a WasteListComponent para actualizar la tabla
      },
      error: response => {
        this.handleError(response);
        this.isSaving = false; // Vuelve a habilitar el botón en caso de error
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

  loadAllRoutes() {
    // Carga todas las rutas disponibles
    this.wasteService.listRoutes().subscribe({
      next: (response: any) => {
        const { data } = response;
        if (data) {
          this.routes = data;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  loadAllClassification() {
    // Carga todas las clasificaciones disponibles
    this.wasteService.listClassification().subscribe({
      next: (response: any) => {
        const { data } = response;
        if (data) {
          this.classifications = data;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  loadAllTypeWaste(dato: string) {
    // Carga todos los tipos de residuos basados en la clasificación
    this.wasteService.listTypeWaste(dato).subscribe({
      next: (response: any) => {
        const { data } = response;
        if (data) {
          this.typeWaste = data;
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
      typeWaste: { value: '', disabled: true },
      classification: '',
      weight: '',
      route: ''
    });
    this.waste = undefined;
  }

  weightValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // Validador personalizado para el campo weight
    const weightPattern = /^[0-9]+(?:,[0-9]{1,2})?$/;

    if (!weightPattern.test(control.value)) {
      return { invalidWeight: true };
    }
    return null;
  }

  preventInvalidCharacters(event: KeyboardEvent): void {
    // Método para evitar caracteres no permitidos
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];

    if (allowedKeys.indexOf(event.key) !== -1) {
      return;
    }

    const pattern = /[0-9,]/;
    const inputChar = event.key;

    const currentWeight = (event.target as HTMLInputElement).value;
    const [, decimalPart] = currentWeight.split(',');

    if (!pattern.test(inputChar) || (decimalPart && decimalPart.length === 2)) {
      event.preventDefault();
    }
  }
}
