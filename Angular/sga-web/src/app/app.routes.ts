import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CollectionPointsComponent } from './components/collection-points/collection-points.component';
import { WasteListComponent } from './components/waste/waste-list/waste-list.component';
import { ReportComponent } from './components/report/report.component';

export const routes: Routes = [
   
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'user',
        loadComponent: () => import('./components/user/user-list/user-list.component')
    },
    { path: 'report', component: ReportComponent },
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
