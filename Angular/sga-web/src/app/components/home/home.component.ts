import { Component } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { CommonModule } from '@angular/common';

export interface WasteManagementStage {
    title: string;
    description: string;
    imageUrl: string;
  }

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [BannerComponent, CommonModule  ]
})
export class HomeComponent {
    stages: WasteManagementStage[] = [
        {
          title: 'Generación de Residuos',
          description: 'Esta etapa se refiere a la producción de residuos sólidos en diferentes sectores de la sociedad, como hogares, industrias, comercios, hospitales, entre otros. La cantidad y tipo de residuos generados dependen de factores como la ubicación geográfica, la densidad poblacional, el nivel de industrialización y los hábitos de consumo.',
          imageUrl: 'assets/images/home/generacion-de-residuos.jpg'
        },
        {
          title: 'Almacenamiento de Residuos',
          description: 'Los residuos sólidos generados se almacenan temporalmente en contenedores o recipientes adecuados antes de ser recolectados. Es importante que el almacenamiento se realice de forma segura para evitar problemas de salud y contaminación ambiental.',
          imageUrl: 'assets/images/home/almacenamiento-de-residuos.jpg'
        },
        {
          title: 'Recolección de Residuos',
          description: 'En esta fase, los residuos sólidos son recolectados y transportados desde los puntos de almacenamiento hasta las instalaciones de tratamiento o disposición final. La recolección puede ser realizada por entidades públicas o privadas, dependiendo del sistema de gestión de residuos de cada localidad.',
          imageUrl: 'assets/images/home/recoleccion-residuos.jpg'
        },
        {
          title: 'Transporte de Residuos',
          description: 'Una vez recolectados, los residuos son transportados hacia las plantas de tratamiento, reciclaje, o disposición final. El transporte debe cumplir con normativas y regulaciones para evitar derrames, accidentes y la emisión de contaminantes durante el trayecto.',
          imageUrl: 'assets/images/home/transporte-residuos.jpeg'
        },
        {
          title: 'Tratamiento de Residuos',
          description: 'En esta etapa, los residuos sólidos son sometidos a diferentes procesos de tratamiento con el objetivo de reducir su volumen, recuperar materiales reciclables y convertir residuos orgánicos en compost o biogás.',
          imageUrl: 'assets/images/home/tratamiento-residuos.jpg'
        },
        {
          title: 'Disposición Final de Residuos',
          description: 'Los residuos que no pueden ser reciclados ni tratados son llevados a vertederos controlados o incinerados, asegurando que su disposición final se realice de manera segura y minimizando el impacto ambiental.',
          imageUrl: 'assets/images/home/disposicion-final-residuos.jpg'
        },{
          title: 'Monitoreo de Residuos',
          description: 'El monitoreo es fundamental para evaluar la efectividad de las estrategias de gestión de residuos implementadas. Esta etapa implica la recolección y análisis de datos sobre la generación, composición y manejo de los residuos sólidos.',
          imageUrl: 'assets/images/home/monitoreo-residuos.jpg'
        }
      ];
    
    }