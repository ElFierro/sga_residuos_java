import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
import { WasteService } from '../../../services/waste.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive?: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  labels: any;
  title: ApexTitleSubtitle;
};

interface WasteData {
  typeWaste: string;
  classification: string;
  weight: number;
}

@Component({
  selector: 'app-waste-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './waste-chart.component.html',
  styleUrls: ['./waste-chart.component.css']
})
export class WasteChartComponent implements OnInit, OnDestroy {
  usableWaste: ChartOptions;
  organicWaste: ChartOptions;
  notUsableWaste: ChartOptions;
  dangerousWaste: ChartOptions;

  constructor(private wasteService: WasteService, private cdr: ChangeDetectorRef) {
    // Definir las gráficas inicialmente con datos estáticos
    this.usableWaste = this.createChartOptions([], 'Grafica residuos aprovechables');
    this.organicWaste = this.createChartOptions([], 'Grafica residuos orgánicos');
    this.notUsableWaste = this.createChartOptions([], 'Grafica residuos no aprovechables');
    this.dangerousWaste = this.createChartOptions([], 'Grafica residuos peligrosos');
  }

  ngOnInit(): void {
    // Cargar los datos al iniciar el componente
    this.loadAllTypeWasteByClassification();
    // Escuchar el evento visibilitychange
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  ngOnDestroy(): void {
    // Eliminar el listener cuando el componente se destruya
    document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  handleVisibilityChange(): void {
    if (document.visibilityState === 'visible') {
      // La pestaña es visible, cargar los datos y actualizar las gráficas
      this.loadAllTypeWasteByClassification();
    }
  }

  loadAllTypeWasteByClassification() {
    this.wasteService.listTypeWasteByClassification().subscribe({
      next: (response: any) => {
        const { data } = response;
        if (data) {
          const usableWasteData = data.filter((item: WasteData) => item.classification === 'Aprovechable');
          const organicWasteData = data.filter((item: WasteData) => item.classification === 'Orgánico aprovechable');
          const notUsableWasteData = data.filter((item: WasteData) => item.classification === 'No aprovechables');
          const dangerousWasteData = data.filter((item: WasteData) => item.classification === 'Peligrosos');
          
          // Actualizar las opciones de las gráficas directamente
          this.usableWaste.series = usableWasteData.map((item: WasteData) => item.weight);
          this.organicWaste.series = organicWasteData.map((item: WasteData) => item.weight);
          this.notUsableWaste.series = notUsableWasteData.map((item: WasteData) => item.weight);
          this.dangerousWaste.series = dangerousWasteData.map((item: WasteData) => item.weight);
  
          // Forzar la detección de cambios después de actualizar las opciones de las gráficas
          this.cdr.detectChanges();
        }  
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  

  private createChartOptions(data: WasteData[], title: string): ChartOptions {
    return {
      series: data.map(item => item.weight),
      chart: {
        type: 'donut'
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          }
        }
      },
      labels: data.map(item => item.typeWaste),
      title: {
        text: title
      }
    };
  }
  
}
