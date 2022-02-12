import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  authUrl = environment.authUrl;
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
