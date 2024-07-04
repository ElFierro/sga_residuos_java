import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { WasteModalComponent } from '../waste-modal/waste-modal.component';
import { WasteChartComponent } from "../waste-chart/waste-chart.component";
import { AuthService } from '../../../services/auth.service';
import { WasteTipsComponent } from "../waste-tips/waste-tips.component";
import { WasteTableComponent } from "../waste-table/waste-table.component";
import { BannerComponent } from "../../banner/banner.component";

@Component({
    selector: 'app-waste-management',
    standalone: true,
    templateUrl: './waste-management.component.html',
    styleUrl: './waste-management.component.css',
    imports: [
        NgFor,
        NgIf,
        WasteModalComponent,
        WasteChartComponent,
        WasteTipsComponent,
        WasteTableComponent,
        BannerComponent
    ]
})
export class WasteListComponent implements OnInit {
  userLoginOn: boolean = false;
  isEmploye: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  waste: any;
  userRole: string = '';

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.userLoginOn.subscribe((userLoginOn) => {
      this.userLoginOn = userLoginOn;
      if (!userLoginOn) {
        this.isAdmin = false;
        this.isUser = false;
        this.isEmploye = false;
      }
    });

    this.authService.userRole.subscribe((role) => {
      this.userRole = role;
      this.isAdmin = role === 'Administrador';
      this.isUser = role === 'Usuario';
      this.isEmploye = role === 'Empleado';
    });

  }
}