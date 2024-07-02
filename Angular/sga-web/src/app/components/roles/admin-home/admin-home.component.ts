import { Component } from '@angular/core';
import { BannerComponent } from "../../banner/banner.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-admin-home',
    standalone: true,
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.css',
    imports: [BannerComponent, RouterModule]
})
export class AdminHomeComponent {

}
