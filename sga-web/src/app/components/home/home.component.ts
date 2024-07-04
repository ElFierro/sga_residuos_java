import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { CommonModule } from '@angular/common';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';

export interface WasteManagementStage {
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [BannerComponent, CommonModule, SlickCarouselModule]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('slickModal', { static: false }) slickModal: SlickCarouselComponent | undefined;

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 1000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  slides: WasteManagementStage[] = [
    {
      title: '1. Generación de Residuos',
      description: 'Esta etapa se refiere a la producción de residuos sólidos en diferentes sectores de la sociedad. La cantidad y tipo de residuos generados dependen de factores como la ubicación geográfica, la densidad poblacional y el nivel de industrialización.',
      imageUrl: 'assets/images/home/generacion-de-residuos.jpg'
    },
    {
      title: '2. Almacenamiento de Residuos',
      description: 'Los residuos sólidos generados se almacenan temporalmente en contenedores o recipientes adecuados antes de ser recolectados. Es importante que el almacenamiento se realice de forma segura para evitar problemas de salud y contaminación ambiental.',
      imageUrl: 'assets/images/home/almacenamiento-de-residuos.jpg'
    },
    {
      title: '3. Recolección de Residuos',
      description: 'En esta fase, los residuos sólidos son recolectados y transportados desde los puntos de almacenamiento hasta las instalaciones de tratamiento o disposición final. La recolección puede ser realizada por entidades públicas o privadas.',
      imageUrl: 'assets/images/home/recoleccion-residuos.jpg'
    },
    {
      title: '4. Transporte de Residuos',
      description: 'Una vez recolectados, los residuos son transportados hacia las plantas de tratamiento, reciclaje, o disposición final. El transporte debe cumplir con normativas y regulaciones para evitar derrames, accidentes y la emisión de contaminantes durante el trayecto.',
      imageUrl: 'assets/images/home/transporte-residuos.jpeg'
    },
    {
      title: '5. Tratamiento de Residuos',
      description: 'En esta etapa, los residuos sólidos son sometidos a diferentes procesos de tratamiento con el objetivo de reducir su volumen, recuperar materiales reciclables y convertir residuos orgánicos en compost o biogás.',
      imageUrl: 'assets/images/home/tratamiento-residuos.jpg'
    },
    {
      title: '6. Disposición Final de Residuos',
      description: 'Los residuos que no pueden ser reciclados ni tratados son llevados a vertederos controlados o incinerados, asegurando que su disposición final se realice de la manera mas segura posible y asi poder minimizar el impacto ambiental.',
      imageUrl: 'assets/images/home/disposicion-final-residuos.jpg'
    },
    {
      title: '7. Monitoreo de Residuos',
      description: 'El monitoreo es fundamental para evaluar la efectividad de las estrategias de gestión de residuos implementadas. Esta etapa implica la recolección y análisis de datos sobre la generación, composición y manejo de los residuos sólidos.',
      imageUrl: 'assets/images/home/monitoreo-residuos.jpg'
    }
  ];

  ngAfterViewInit(): void {
    // Implementa la lógica que necesites después de la inicialización de la vista aquí
    // Ejemplo: Si necesitas realizar alguna acción con el componente slickModal
    if (this.slickModal) {
      console.log('Slick Carousel Component is initialized', this.slickModal);
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
