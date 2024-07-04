import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  list(){
    return this.http.get(environment.apiEndpoints.userService)
  }

  get(id: string){
    return this.http.get(environment.apiEndpoints.userService+id)
  }

  create(user: any){
    return this.http.post(environment.apiEndpoints.userService, user)
  }

  update(id: string, user: any){
    return this.http.put(environment.apiEndpoints.userService+id, user)
  }

  delete(id: string){
    return this.http.delete(environment.apiEndpoints.userService+id)
  }

  listRoles(){
    return this.http.get(environment.apiEndpoints.userService+'roles')
  }

  checkEmail(email: string): Observable<any>{
    return this.http.get(environment.apiEndpoints.userService+'email/'+email)
  }
  
  checkEmailWithIdUser(email: string, idUser: string): Observable<any>{
    return this.http.get(environment.apiEndpoints.userService+ 'email/'+email+'?idUser='+idUser)
  }
}
