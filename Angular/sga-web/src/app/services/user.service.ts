import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {  Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  list(){
    return this.http.get('http://localhost:8080/api/v1/user/')
  }

  get(id: string){
    return this.http.get(`http://localhost:8080/api/v1/user/${id}`)
  }

  create(user: any){
    return this.http.post('http://localhost:8080/api/v1/user/', user)
  }

  update(id: string, user: any){
    return this.http.put(`http://localhost:8080/api/v1/user/${id}`, user)
  }

  delete(id: string){
    return this.http.delete(`http://localhost:8080/api/v1/user/${id}`)
  }

  listRoles(){
    return this.http.get('http://localhost:8080/api/v1/user/roles')
  }

  checkEmail(email: string): Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/user/email/${email}`)
  }
  
  checkEmailWithIdUser(email: string, idUser: string): Observable<any>{
    return this.http.get(`http://localhost:8080/api/v1/user/email/${email}?idUser=${idUser}`)
  }
}
