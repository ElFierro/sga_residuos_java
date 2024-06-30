import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import SignupComponent from '../auth/signup-modal/signup-modal.component';
import { SigninComponent } from '../auth/signin-modal/signin-modal.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import Swal from 'sweetalert2';

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
  isMenuHidden = true;
  isEmploye: boolean = false;
  isUser: boolean = false;
  waste: any;
  userRole: string = '';


  constructor(private modalService: ModalService, private authService: AuthService,
     private router: Router, private reportService: ReportService) {

  }

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
    this.closeMenu();
    Swal.fire({
      title: '¡Hasta luego!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  
  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
   
  }

  openLoginModal() {
    this.modalService.openModal('signin');
  }

  openSignUpModal() {
    this.modalService.openModal('signup');
  }

  closeMenu() {
    this.isMenuHidden = true;
  }
  
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('#menu') || target.closest('#menu-button');
    if (!clickedInside) {
      this.closeMenu();
    }
  }
}