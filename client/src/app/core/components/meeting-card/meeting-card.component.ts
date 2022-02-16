import { Component, HostListener, Input, OnInit } from '@angular/core';
import { interval, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.scss'],
})
export class MeetingCardComponent implements OnInit {
  public widthThreshold = environment.widthThreshold;
  public innerWidth: any;
  public remainingTime: any = {};
  @Input() type = '';
  @Input() meeting: any;
  seeMore = false;
  description =
    'Conversemos de western clásicos y cómo influyen en la sociedad. Muchas veces, las películas del Oeste están ambientadas en territoriosinexplorados o indómitos, bajo la amenaza latente del ataque de los indios, o en ciudades sin ley en las que los bandidos campaban a sus anchas. Por ello, el género se fue enfocando hacia la confrontación de losdiversos personajes, adquiriendo un carácter cada vez más psicológico.';
  constructor() {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.start().subscribe((_) => {});
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  updateTime() {
    const now = new Date();
    const diff = this.meeting.startTime.getTime() - now.getTime();

    // Cálculos para sacar lo que resta hasta ese tiempo objetivo / final
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    const secs = Math.floor(diff / 1000);

    // La diferencia que se asignará para mostrarlo en la pantalla
    this.remainingTime.days = days;
    this.remainingTime.hours = hours - days * 24;
    this.remainingTime.minutes = mins - hours * 60;
    this.remainingTime.seconds = secs - mins * 60;
  }

  start() {
    return interval(1000).pipe(
      map((x: number) => {
        this.updateTime();
        return x;
      })
    );
  }
}
