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
  getWillAttendMeetings(body: any) {
    return this.genericGet('models/meetings/will-attend');
  }
  inviteUserToMeeting(meetingId: number, body: any) {
    return this.genericPut(body, `models/meetings/${meetingId}/invite`);
  }
  acceptMeetingInvitation(meetingId: number, body: any) {
    return this.genericPut(
      body,
      `models/meetings/${meetingId}/accept-invitation`
    );
  }

  addSuggestion(body: any) {
    return this.genericPost(body, `models/suggestions/`);
  }
  addMeetingToCalendar(meetingId: number) {
    return this.genericPut(
      { status: 'request' },
      `models/meetings/${meetingId}/add-to-calendar`
    );
  }
  addMeetingToWaitingList(meetingId: number) {
    return this.genericPut(
      { status: 'request' },
      `models/meetings/${meetingId}/add-to-waiting-list`
    );
  }
  removeMeetingFromCalendar(meetingId: number) {
    return this.genericPut(
      { status: 'request' },
      `models/meetings/${meetingId}/remove-from-calendar`
    );
  }
  addMeetingReview(meetingId: number, body: any) {
    return this.genericPut(body, `models/meetings/${meetingId}/add-review`);
  }
  addMeetingReviewHost(meetingId: number, body: any) {
    return this.genericPut(
      body,
      `models/meetings/${meetingId}/add-review-host`
    );
  }
  endMeeting(meetingId: number) {
    return this.genericPut(
      { status: 'finished' },
      `models/meetings/${meetingId}/finish`
    );
  }
  cancelMeeting(meetingId: number) {
    return this.genericPut(
      { status: 'canceled' },
      `models/meetings/${meetingId}/cancel`
    );
  }
  getNextMeetings() {
    return this.genericGet('models/meetings/next');
  }

  getOfferedMeetings() {
    return this.genericGet('models/meetings/offered');
  }
  getCanceledMeetings() {
    return this.genericGet('models/meetings/canceled');
  }
  getPastMeetings() {
    return this.genericGet('models/meetings/past');
  }

  getMeetingInvitations() {
    return this.genericGet('models/meetings/invitation');
  }

  getMeetingWaitingList() {
    return this.genericGet('models/meetings/waiting-list');
  }

  updateUser(body: any) {
    let id = localStorage.getItem('userId');
    console.log(body, 'body');
    return this.genericPut(body, `models/users/${id}`);
  }

  getUsers() {
    return this.genericGet(`models/users/full`);
  }

  getCurrentUser() {
    const id = localStorage.getItem('userId');
    console.log(id, 'ID');
    return this.genericGet(`models/users/${id}/simple`);
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

  genericDelete(endpoint: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete(`${this.apiUrl}/${endpoint}`, httpOptions);
  }
}
