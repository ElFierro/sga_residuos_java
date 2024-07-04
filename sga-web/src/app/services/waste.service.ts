import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WasteService {
  [x: string]: any;
  private http = inject(HttpClient);

  list(email?: string){
    let params = new HttpParams();
    if (email) {
      params = params.set('email', email);
    }
    return this.http.get(environment.apiEndpoints.wasteService, { params });
  }

  get(id: string){
    return this.http.get(environment.apiEndpoints.wasteService + id)
  }

  create(waste: any){
    return this.http.post(environment.apiEndpoints.wasteService, waste)
  }

  update(waste: any){
    return this.http.put(environment.apiEndpoints.wasteService, waste)
  }

  delete(id: string){
    return this.http.delete(environment.apiEndpoints.wasteService+id)
  }

  listRoutes(){
    return this.http.get(environment.apiEndpoints.wasteService+'routes')
  }

  listClassification(){
    return this.http.get(environment.apiEndpoints.wasteService+'classification')
  }

  listTypeWaste(classification: string){
    return this.http.get(environment.apiEndpoints.wasteService+'type/'+classification)
  }

  listTypeWasteByClassification(){
    return this.http.get(environment.apiEndpoints.wasteService+'filter/classification')
  }
}
