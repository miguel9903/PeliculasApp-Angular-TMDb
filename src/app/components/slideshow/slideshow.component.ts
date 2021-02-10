import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Movie } from '../../interfaces/now_playing-response';
import Swiper from 'swiper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  swiper: Swiper;

  constructor( private router: Router ) { }

  ngAfterViewInit(): void {
      this.swiper = new Swiper('.swiper-container', {
      loop: true
    });
    this.swiper.slideNext();
  }

  ngOnInit(): void {
    // console.log(this.movies);
  }

  onSlidePrev(): void {
    this.swiper.slidePrev();
  }

  onSlideNext(): void {
    this.swiper.slideNext();
  }

  verPelicula(id: string): void {
     this.router.navigate(['/movie', id]);
  }

}
