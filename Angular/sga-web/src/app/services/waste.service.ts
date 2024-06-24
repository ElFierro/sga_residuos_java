import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WasteService {
  private http = inject(HttpClient);

  list(email?: string){
    let params = new HttpParams();
    if (email) {
      params = params.set('email', email);
    }
    return this.http.get('http://localhost:8181/api/v1/waste/', { params });
  }

  get(id: string){
    return this.http.get(`http://localhost:8181/api/v1/waste/${id}`)
  }

  create(waste: any){
    return this.http.post('http://localhost:8181/api/v1/waste/', waste)
  }

  update(waste: any){
    return this.http.put(`http://localhost:8181/api/v1/waste/`, waste)
  }

  delete(id: string){
    return this.http.delete(`http://localhost:8181/api/v1/waste/${id}`)
  }

  listRoutes(){
    return this.http.get('http://localhost:8181/api/v1/waste/routes')
  }

  listClassification(){
    return this.http.get('http://localhost:8181/api/v1/waste/classification')
  }

  listTypeWaste(classification: string){
    return this.http.get(`http://localhost:8181/api/v1/waste/type/${classification}`)
  }

  listTypeWasteByClassification(){
    return this.http.get(`http://localhost:8181/api/v1/waste/filter/classification`)
  }
}
