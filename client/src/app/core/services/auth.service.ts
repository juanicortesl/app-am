import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = 'http://localhost:8000/authentication';
  constructor(private http: HttpClient) {}
  createUser(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(
      `${this.authUrl}/register/app-user`,
      body,
      httpOptions
    );
  }
  signIn(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`${this.authUrl}/login/app-user`, body, httpOptions);
  }
}
