import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportUserService } from '../../services/user-reports.service';
import { Report_interface } from '../../models/report_interface';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.css'
})
export class CreateReportComponent {
  reportForm: FormGroup;
  idExists: boolean = false;
  maxDescriptionLength: 150 = 150;

  constructor(
    private fb: FormBuilder,
    private reportsUsersService: ReportUserService,
    private router: Router, 
  ) {
    this.reportForm = this.fb.group({
      //id: ['', [Validators.required]],
      description: ['', [Validators.required, this.wordCountValidator(this.maxDescriptionLength)]],
      username: ['', [Validators.required, Validators.email]],
      report_status: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      const newReport: Report_interface = this.reportForm.value;
      this.reportsUsersService.createReport(newReport).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Reporte creado',
            text: 'Reporte creado exitosamente'
          });
          this.router.navigate(['/reportesusuarios']);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear el reporte'
          });
        }
      });
    } else if (this.idExists) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID ya existe en la base de datos'
      });
      console.log('Error al crear el reporte');
    }
  }

  wordCountValidator(maxWords: number) {
    return (control: AbstractControl) => {
      const words = control.value ? control.value.split(/\s+/) : [];
      return words.length > maxWords ? { wordCount: true } : null;
    };
  }

  getDescriptionErrorMessage() {
    const control = this.reportForm.controls['description'];
    if (control.hasError('required')) {
      return 'Descripción es requerida';
    }
    if (control.hasError('wordCount')) {
      return `Máximo ${this.maxDescriptionLength} palabras permitidas`;
    }
    return '';
  }

  getRemainingCharacters() {
    const descriptionControl = this.reportForm.controls['description'];
    const descriptionLength = descriptionControl.value ? descriptionControl.value.length : 0;
    return this.maxDescriptionLength - descriptionLength;
  }
}
