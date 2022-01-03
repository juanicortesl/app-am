import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // apiUrl = 'http://localhost:8000/api';
  apiUrl = 'https://arcane-island-14669.herokuapp.com/api';
  constructor(private http: HttpClient) {}

  createUser(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`${this.apiUrl}/user/create`, body, httpOptions);
  }
}
