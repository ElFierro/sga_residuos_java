// src/app/services/modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
// Estado de los modales, identificados por un ID único
private modalsState: { [key: string]: BehaviorSubject<boolean> } = {};
private wasteIdState: { [key: string]: BehaviorSubject<string | null> } = {};

// Método para inicializar un modal con un ID específico
initModal(modalId: string) {
  if (!this.modalsState[modalId]) {
    this.modalsState[modalId] = new BehaviorSubject<boolean>(false);
  }
  if (!this.wasteIdState[modalId]) {
    this.wasteIdState[modalId] = new BehaviorSubject<string | null>(null);
  }
}

// Método para abrir un modal con un ID específico
openModal(modalId: string, id?: string) {
  this.initModal(modalId);
  this.wasteIdState[modalId].next(id || null);
  this.modalsState[modalId].next(true);
}

// Método para cerrar un modal con un ID específico
closeModal(modalId: string) {
  this.initModal(modalId);
  this.modalsState[modalId].next(false);
}

// Observables para el estado de un modal específico
isModalOpen$(modalId: string) {
  this.initModal(modalId);
  return this.modalsState[modalId].asObservable();
}

getWasteId$(modalId: string) {
  this.initModal(modalId);
  return this.wasteIdState[modalId].asObservable();
}
  
}
