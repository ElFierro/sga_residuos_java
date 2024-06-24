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
    {
        path:'user-reports',
        loadComponent: () => import('./components/user-reports/user-reports.component').then(m => m.UserReportsComponent)
    },
    {
        path:'create-report',
        loadComponent: () => import('./components/create-report/create-report.component').then(m => m.CreateReportComponent)
    },
    {
        path:'check-my-report',
        loadComponent: () => import('./components/check-my-report/check-my-report.component').then(m => m.CheckMyReportComponent)
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
