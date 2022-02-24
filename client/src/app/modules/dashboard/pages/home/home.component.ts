import { Router } from '@angular/router';
import { ApiService } from './../../../../core/http/api.service';
import { environment } from './../../../../../environments/environment';
import { Component, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public widthThreshold = environment.widthThreshold;
  public innerWidth: any;
  themes = [
    {
      title: 'Cine y literatura',
      icon: 'bi bi-book',
      value: 'cine y literatura',
    },
    { title: 'Actualidad', icon: 'bi bi-newspaper', value: 'actualidad' },
    { title: 'Otros', icon: 'bi bi-people' },
    { title: 'Todos', icon: 'bi bi-card-checklist' },
  ];
  readyMeeting = {
    theme: 'Cine y literatura',
    type: 'open',
    Host: { first_name: 'Andrea Witing' },
    startTime: new Date(2022, 1, 17, 14, 30),
    endTime: new Date(2022, 1, 17, 15, 30),
    availableSlots: 4,
    description: '',
  };
  toBeMeeting = {
    theme: 'Actualidad',
    type: 'open',
    Host: { first_name: 'Pablo Escobar' },
    startTime: new Date(2022, 1, 23, 15, 30),
    endTime: new Date(2022, 1, 23, 16, 30),
    availableSlots: 4,
    description:
      'Conversemos de western clásicos y cómo influyen en la sociedad. Muchas veces, las películas del Oeste están ambientadas en territoriosinexplorados o indómitos, bajo la amenaza latente del ataque de los indios, o en ciudades sin ley en las que los bandidos campaban a sus anchas. Por ello, el género se fue enfocando hacia la confrontación de losdiversos personajes, adquiriendo un carácter cada vez más psicológico. ',
  };
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.apiService.getOfferedMeetings().subscribe((data) => {
      console.log(data);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  goToSearcher(theme: any) {
    this.router.navigate(['dashboard/searcher'], { state: { theme: theme } });
  }
}
