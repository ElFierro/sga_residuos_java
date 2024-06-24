import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import SignupComponent from '../auth/signup-modal/signup-modal.component';
import { SigninComponent } from '../auth/signin-modal/signin-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, SigninComponent, SignupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private modalService: ModalService) {}

  openLoginModal() {
    this.modalService.openModal('signin');
  }

  openSignUpModal() {
    this.modalService.openModal('signup');
  }
}
