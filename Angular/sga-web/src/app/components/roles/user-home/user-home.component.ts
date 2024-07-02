import { Component } from '@angular/core';
import { BannerComponent } from "../../banner/banner.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-user-home',
    standalone: true,
    templateUrl: './user-home.component.html',
    styleUrl: './user-home.component.css',
    imports: [BannerComponent, RouterModule]
})
export class UserHomeComponent {

}
