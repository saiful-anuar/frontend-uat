import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  baseUrl = ''; // TODO add backend connection
  
  constructor() { }
 
  signup = (data: any) => {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  // TODO login logout isloggedin
  
}
