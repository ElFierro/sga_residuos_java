import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import SignupComponent from '../auth/signup-modal/signup-modal.component';
import { SigninComponent } from '../auth/signin-modal/signin-modal.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  isLoggedIn: boolean = false;

  constructor(private modalService: ModalService, private authService: AuthService) {

    this.authService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })
  }

 

  ngOnInit(): void {
   
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