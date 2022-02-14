import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.scss'],
})
export class MeetingCardComponent implements OnInit {
  public widthThreshold = environment.widthThreshold;
  public innerWidth: any;
  seeMore = false;
  description =
    'Conversemos de western clásicos y cómo influyen en la sociedad. Muchas veces, las películas del Oeste están ambientadas en territoriosinexplorados o indómitos, bajo la amenaza latente del ataque de los indios, o en ciudades sin ley en las que los bandidos campaban a sus anchas. Por ello, el género se fue enfocando hacia la confrontación de losdiversos personajes, adquiriendo un carácter cada vez más psicológico.';
  constructor() {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
}
