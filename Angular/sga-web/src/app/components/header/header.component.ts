import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import SignupComponent from '../auth/signup-modal/signup-modal.component';
import { SigninComponent } from '../auth/signin-modal/signin-modal.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, SigninComponent, SignupComponent, RouterOutlet, RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userLoginOn:boolean=false;
  isMenuOpen = false;
  isAdmin: boolean = false;
  userInitial: string = '';

  constructor(private modalService: ModalService, private authService: AuthService,
     private router: Router, private reportService: ReportService) {

  }

  ngOnInit(): void {
    this.authService.userLoginOn.subscribe((userLoginOn) => {
      this.userLoginOn = userLoginOn;
    });


    
    this.authService.userRole.subscribe((role) => {
      if (role === 'Administrador') {
        this.isAdmin = true;
      } 
    });

    // Obtener el correo del usuario para mostrar la inicial en el círculo
    this.authService.getUserEmail().subscribe((email) => {
      if (email) {
        this.userInitial = email.charAt(0).toUpperCase(); 
      }
    });
  }

  downloadReport() {
    this.reportService.downloadCollectionPointsReport().subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'collection_points_report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openLoginModal() {
    this.modalService.openModal('signin');
  }

  openSignUpModal() {
    this.modalService.openModal('signup');
  }
  
}