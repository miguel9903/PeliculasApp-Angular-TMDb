import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/now_playing-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  moviesSlideshow: Movie[] = [];
  loading: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if(pos > max) {
        this.moviesService.getNowPlaying()
            .subscribe(movies => {
                this.movies.push(...movies);
            });
    }
  }

  constructor( private moviesService: MoviesService ) { }

  ngOnInit(): void {
    this.loading = true;
    this.moviesService.getNowPlaying()
        .subscribe(movies => {
          this.movies = movies;
          this.moviesSlideshow = movies;
          this.loading = false;
        });
  }

  ngOnDestroy(): void {
    this.moviesService.resetNowPlayingPage();
  }

}
