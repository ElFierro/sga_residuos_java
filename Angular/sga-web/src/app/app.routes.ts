import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CollectionPointsComponent } from './components/collection-points/collection-management/collection-points.component';
import { WasteListComponent } from './components/waste/waste-management/waste-management.component';
import { ReportComponent } from './components/report/report.component';
import { AuthGuard } from './utils/auth.guard';

export const routes: Routes = [
   
    {
        path:'home',
        component: HomeComponent
    },
    {
        path: 'report',
        component: ReportComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['Administrador', 'Usuario'] }
    },
    {
        path: 'user',
        loadComponent: () => import('./components/user/user-list/user-list.component'),
        canActivate: [AuthGuard],
        data: { allowedRoles: ['Administrador'] }
    },
    {
        path:'management-waste',
        component: WasteListComponent
    },
    {
        path:'collection-points',
        component: CollectionPointsComponent
    }, 
    {
        path:'**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
