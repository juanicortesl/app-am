import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  devMode = true;
  // apiUrl = 'http://localhost:8000/api';
  apiUrl = 'https://arcane-island-14669.herokuapp.com/api';
  constructor(private http: HttpClient) {}

  createUser(body: any) {
    return this.genericPost(body, 'sign_up');
  }

  signIn(body: any) {
    return this.genericPost(body, 'sign_in');
  }

  setUserType(body: any) {
    return this.genericPost(body, 'set_type');
  }

  setInterests(body: any) {
    return this.genericPost(body, 'set_interests');
  }

  addAvailableMeeting(body: any) {
    return this.genericPost(body, 'add_meeting');
  }

  getAvailableMeetings(body: any) {
    return this.genericPost(body, 'meetings/available');
  }
  requestMeeting(body: any) {
    return this.genericPost(body, 'meetings/request');
  }
  getRequestedMeetings() {
    return this.genericGet('meetings/get_requested');
  }

  getOfferedMeetings() {
    return this.genericGet('meetings/offered');
  }

  getPastMeetings() {
    return this.genericGet('meetings/past');
  }

  genericPost(body: any = {}, endpoint: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`${this.apiUrl}/${endpoint}`, body, httpOptions);
  }

  genericGet(endpoint: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get(`${this.apiUrl}/${endpoint}`, httpOptions);
  }
}
