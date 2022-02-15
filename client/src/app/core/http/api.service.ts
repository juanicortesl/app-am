import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  devMode = true;
  apiUrl = environment.apiUrl;
  authUrl = environment.authUrl;
  constructor(private http: HttpClient) {}

  setUserType(body: any) {
    return this.genericPost(body, 'set_type');
  }

  setInterests(body: any) {
    return this.genericPost(body, 'set_interests');
  }

  addAvailableMeeting(body: any) {
    return this.genericPost(body, `models/meetings/`);
  }

  getAvailableMeetings(body: any) {
    return this.genericGet('models/meetings/available');
  }
  requestMeeting(meetingId: number) {
    return this.genericPut(
      { status: 'requested' },
      `models/meetings/${meetingId}/request`
    );
  }
  getNextMeetings() {
    return this.genericGet('models/meetings/next');
  }

  getOfferedMeetings() {
    return this.genericGet('models/meetings/offered');
  }

  getPastMeetings() {
    return this.genericGet('models/meetings/past');
  }

  updateUser(body: any) {
    let id = localStorage.getItem('userId');
    console.log(body, 'body');
    return this.genericPut(body, `models/users/${id}`);
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

  genericPut(body: any = {}, endpoint: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put(`${this.apiUrl}/${endpoint}`, body, httpOptions);
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