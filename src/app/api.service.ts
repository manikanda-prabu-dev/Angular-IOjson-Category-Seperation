import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL : string = "http://localhost:3000/products";
  constructor( private httpClient : HttpClient) { }
  getProductList() {
    return this.httpClient.get(this.BASE_URL);
  }
}
