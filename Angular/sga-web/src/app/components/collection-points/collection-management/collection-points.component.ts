import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { BannerComponent } from "../../banner/banner.component";
import { WasteDescriptionComponent } from "../collection-description/collection-description.component";
import { CollectionMapComponent } from "../collection-map/collection-map.component";
import { BenefitsRecycleComponent } from "../benefits-recycle/benefits-recycle.component";

@Component({
    selector: 'app-collection-points',
    standalone: true,
    templateUrl: './collection-points.component.html',
    styleUrls: ['./collection-points.component.css'],
    imports: [ FormsModule, NgFor, NgIf, BannerComponent, WasteDescriptionComponent, CollectionMapComponent, BenefitsRecycleComponent]
})
export class CollectionPointsComponent implements OnInit {
 
  userLoginOn:boolean=false;
  isUser: boolean = false;
 isAdmin: boolean = false;

  ngOnInit() {

    this.authService.userLoginOn.subscribe((userLoginOn) => {
      this.userLoginOn = userLoginOn;
      if (!userLoginOn) { // Reiniciar roles si no hay sesión activa
        this.isAdmin = false;
        this.isUser = false;
      }
    });
  
    this.authService.userRole.subscribe((role) => {
      this.isAdmin = role === 'Administrador';
      this.isUser = role === 'Usuario';
    });
  }
  constructor( private authService: AuthService) {}

  
}
