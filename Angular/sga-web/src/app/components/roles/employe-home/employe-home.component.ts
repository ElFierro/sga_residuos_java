import { Component } from '@angular/core';
import { BannerComponent } from "../../banner/banner.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-employe-home',
    standalone: true,
    templateUrl: './employe-home.component.html',
    styleUrl: './employe-home.component.css',
    imports: [BannerComponent, RouterModule]
})
export class EmployeHomeComponent {

}
