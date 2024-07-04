import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-waste-tips',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './waste-tips.component.html',
  styleUrl: './waste-tips.component.css'
})
export class WasteTipsComponent {
  @Input() userLoginOn: boolean = false;
  
  tips = [
    {
      image: 'assets/images/waste/reciclar.jpg',
      title: 'Recicla',
      description: 'Recicla correctamente separando los residuos en las categorías adecuadas y siguiendo las normativas locales de reciclaje.'
    },
    {
      image: 'assets/images/waste/solo-uso.jpeg',
      title: 'Reduce',
      description: 'Reduce la cantidad de residuos que generas comprando productos con menos embalaje y evitando artículos de un solo uso.'
    },
    {
      image: 'assets/images/waste/reutiliza.jpg',
      title: 'Reutiliza',
      description: 'Reutiliza los productos siempre que sea posible antes de desecharlos. Dale una segunda vida a los objetos mediante la reparación o el reciclaje creativo.'
    }
  ];
}
