import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

interface WasteCollectionSection {
  title: string;
  icon: string;
  description: string;
  details: { subtitle: string; info: string }[];
  expanded: boolean;
}

@Component({
  selector: 'app-colletion-description',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './collection-description.component.html',
  styleUrl: './collection-description.component.css'
})
export class WasteDescriptionComponent {

  sections: WasteCollectionSection[] = [
    {
      title: 'Horarios de recolección',
      icon: 'M5 12h14M12 5l7 7-7 7',
      description: 'Conoce los horarios en los que pasamos por tu comunidad para recolectar los residuos.',
      details: [
        { subtitle: 'Lunes', info: 'Recolección de residuos orgánicos de 7:00 AM a 10:00 AM.' },
        { subtitle: 'Martes', info: 'Recolección de residuos reciclables de 7:00 AM a 10:00 AM.' },
        { subtitle: 'Miércoles', info: 'Recolección de residuos no reciclables de 7:00 AM a 10:00 AM.' },
        { subtitle: 'Jueves', info: 'Recolección de residuos peligrosos de 7:00 AM a 10:00 AM.' },
        { subtitle: 'Viernes', info: 'Recolección de residuos orgánicos de 7:00 AM a 10:00 AM.' },
        { subtitle: 'Sábado', info: 'Recolección de residuos reciclables de 7:00 AM a 10:00 AM.' },
        { subtitle: 'Domingo', info: 'No hay servicio de recolección.' }
      ],
      expanded: false
    },
    {
      title: 'Tipos de residuos aceptados',
      icon: 'M5 12h14M12 5l7 7-7 7',
      description: 'Descubre qué tipos de residuos aceptamos en nuestra campaña de recolección.',
      details: [
        { subtitle: 'Residuos Orgánicos', info: 'Residuos de origen biológico que se descomponen naturalmente, como restos de alimentos y poda de jardines.' },
        { subtitle: 'Residuos Reciclables', info: 'Materiales que pueden ser reprocesados para fabricar nuevos productos, como plásticos, vidrio, papel, y metales.' },
        { subtitle: 'Residuos Peligrosos', info: 'Materiales que pueden ser dañinos para la salud y el medio ambiente, como productos químicos, baterías y electrónicos.' }
      ],
      expanded: false
    },
    {
      title: 'Proceso de recolección',
      icon: 'M5 12h14M12 5l7 7-7 7',
      description: 'Conoce en detalle cómo realizamos el proceso de recolección de residuos y la importancia del reciclaje.',
      details: [
        { subtitle: '1. Recolección', info: 'Los residuos se recogen de los hogares, oficinas, y otros puntos de generación.' },
        { subtitle: '2. Transporte', info: 'Los residuos recogidos se transportan a las estaciones de transferencia o plantas de tratamiento.' },
        { subtitle: '3. Clasificación', info: 'En las plantas de tratamiento, los residuos se clasifican en orgánicos, reciclables y no reciclables.' },
        { subtitle: '4. Tratamiento', info: 'Los residuos orgánicos se compostan, los reciclables se procesan y los no reciclables se disponen adecuadamente.' },
        { subtitle: '5. Disposición Final', info: 'Los residuos no reciclables y peligrosos se llevan a rellenos sanitarios o incineradores para su disposición final segura.' },
      ],
      expanded: false
    }
  ];

  toggleDetails(section: WasteCollectionSection) {
    section.expanded = !section.expanded;
  }
}