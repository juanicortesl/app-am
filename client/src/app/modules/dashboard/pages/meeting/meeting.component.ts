import { ApiService } from 'src/app/core/http/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit {
  meeting: any;
  domain: string = 'meet.jit.si'; // For self hosted use your domain
  room: any;
  options: any;
  api: any;
  user: any;
  reviewGiven = false;
  meetingFinished = false;
  isHost = false;

  // For Custom Controls
  isAudioMuted = true;
  isVideoMuted = true;
  fullScreenMode = false;

  public reviewForm = new FormGroup({
    rate: new FormControl(0, [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    if (history.state.meeting) {
      this.meeting = history.state.meeting;
      this.room = this.meeting.meetingLink; // Set your room name
      this.user = {
        name: localStorage.getItem('userName'), // Set your username
      };
      this.isHost = this.meeting.isHost ? true : false;
      console.log('isHOST', this.isHost);
    } else {
      this.router.navigate(['dashboard/home']);
    }
  }

  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      width: '100%',
      height: '100%',
      configOverwrite: {
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        defaultLanguage: 'es',
        disableInviteFunctions: true,
      },
      interfaceConfigOverwrite: {
        LANG_DETECTION: true,
        TOOLBAR_BUTTONS: ['settings'],
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // Event handlers
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
    });
  }

  handleClose = () => {
    this.meetingFinished = true;
    if (this.isHost) {
      this.reviewGiven = true;
    }
    if (this.fullScreenMode) {
      this.executeCommand('resize-large-video');
    }
  };

  handleParticipantLeft = async (participant: any) => {
    // console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant: any) => {
    // console.log('handleParticipantJoined', participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant: any) => {
    // console.log('handleVideoConferenceJoined', participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    // console.log('handleVideoConferenceLeft');
    // this.router.navigate(['/thank-you']);
  };

  handleMuteStatus = (audio: any) => {
    // console.log('handleMuteStatus', audio); // { muted: true }
  };

  handleVideoStatus = (video: any) => {
    // console.log('handleVideoStatus', video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  executeCommand(command: string) {
    if (command == 'resize-large-video') {
      var elem = document.getElementById('meeting-component') as HTMLElement & {
        mozRequestFullScreen(): Promise<void>;
        webkitRequestFullscreen(): Promise<void>;
        msRequestFullscreen(): Promise<void>;
      };
      if (!this.fullScreenMode) {
        if (elem && elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem && elem.mozRequestFullScreen) {
          /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem && elem.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          elem.webkitRequestFullscreen();
        } else if (elem && elem.msRequestFullscreen) {
          /* IE/Edge */
          elem.msRequestFullscreen();
        } else {
          console.log();
        }
      } else {
        const docWithBrowsersExitFunctions = document as Document & {
          mozCancelFullScreen(): Promise<void>;
          webkitExitFullscreen(): Promise<void>;
          msExitFullscreen(): Promise<void>;
        };
        if (docWithBrowsersExitFunctions.exitFullscreen) {
          docWithBrowsersExitFunctions.exitFullscreen();
        } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
          /* Firefox */
          docWithBrowsersExitFunctions.mozCancelFullScreen();
        } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          docWithBrowsersExitFunctions.webkitExitFullscreen();
        } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
          /* IE/Edge */
          docWithBrowsersExitFunctions.msExitFullscreen();
        }
      }
      this.fullScreenMode = !this.fullScreenMode;
    }
    if (command == 'hangup') {
      this.meetingFinished = true;
      if (this.isHost) {
        this.reviewGiven = true;
      }
      this.api.executeCommand(command);
      // this.router.navigate(['/thank-you']);
      return;
    }

    if (command == 'toggleAudio') {
      this.api.executeCommand(command);
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.api.executeCommand(command);
      this.isVideoMuted = !this.isVideoMuted;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log('resize');
    this.api.executeCommand('resizeLargeVideo', window.innerWidth, 500);
  }

  @HostListener('fullscreenchange', ['$event'])
  @HostListener('webkitfullscreenchange', ['$event'])
  @HostListener('mozfullscreenchange', ['$event'])
  @HostListener('MSFullscreenChange', ['$event'])
  screenChange(event: any) {
    // if (document.fullscreenElement) {
    //   this.fullScreenMode = !this.fullScreenMode;
    // }
    // console.log(document.fullscreenElement, 'FULLSCREENEVENT');
  }

  openExternalLink() {
    window.open(`https://meet.jit.si/${this.meeting.meetingLink}`, '_blank');
  }
  get review_rate() {
    return this.reviewForm.get('rate')?.value;
  }
  get review_comment() {
    return this.reviewForm.get('comment')?.value;
  }
  addReview() {
    this.apiService
      .addMeetingReview(this.meeting.id, {
        review_rate: this.review_rate,
        review_comment: this.review_comment,
      })
      .subscribe((data: any) => {
        console.log(data);
        if (data.result) {
          this.reviewGiven = true;
        }
      });
  }
}
