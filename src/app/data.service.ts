import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Makanan } from './makanan';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'https://crudcrud.com/api/d797e461f6a5417fab2cf054ab8c5142';//beda tiap orang

  constructor(private http: HttpClient) {}

  getMakanan(){
    return this.http.get(`${this.baseUrl}/makanan`);
  }
  
  getMakan(id: number){
    return this.http.get(`${this.baseUrl}/makanan/${id}`);
  }

  postMakan(makanan : Makanan){
    delete makanan._id; //delete idnya karena digenerate oleh server
    return this.http.post(`${this.baseUrl}/makanan`, makanan);
  }

  updateMakan(makanan : Makanan){
    const id = makanan._id; //copy original idnya buat ditampung sementara
    delete makanan._id; //delete orginal idnya agar server tidak mereply error message
    return this.http.put(`${this.baseUrl}/makanan/${id}`, makanan);
  }

  deleteMakan(makanan : Makanan){
    const id = makanan._id; //copy original idnya
    return this.http.delete(`${this.baseUrl}/makanan/${id}`);
  }
}
