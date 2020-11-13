import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  protected route: string;

  constructor(protected http: HttpClient) { }

  save(entity: T) {
    return this.http.post(`/${this.route}`, entity, { responseType: 'text' });
  }

  findById(id){
    return this.http.get(`/${this.route}/`+id,{responseType:'json'})
  }

  getAll(){
    return this.http.get(`/${this.route}`,{responseType:'json'});
  }
  update(entity:T){
    return this.http.put(`/${this.route}`,entity,{responseType:'text'})
  }
}