import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/now_playing-response';
import { Location } from '@angular/common';
import { MovieResponse } from '../../interfaces/movie-response';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: MovieResponse;
  loading: boolean = false;
  cast: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private moviesService: MoviesService,
               private location: Location,
               private router: Router ) { }

  ngOnInit(): void {
    const movieID = this.activatedRoute.snapshot.paramMap.get('id');
    combineLatest([
      this.moviesService.getMovie(movieID),
      this.moviesService.getMovieCredits(movieID)
    ]).subscribe(([movie, cast]) => {
        if(!movie) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.movie = movie;
        this.loading = false;

        this.cast = cast;
    });
    // this.getMovieDetail(movieID);
    // this.getMovieCredits(movieID);
  }

  getMovieDetail(movieID: string): void {
    this.moviesService.getMovie(movieID)
        .subscribe(res => {
          if(!res) {
            this.router.navigateByUrl('/home');
            return;
          }
          this.movie = res;
          this.loading = false;
          // console.log(this.movie);
        });
  }

  getMovieCredits(movieID: string): void {
    this.moviesService.getMovieCredits(movieID)
        .subscribe(res => {
          // console.log(res);
          this.cast = res;
        });
  }

  regresar(): void {
    this.location.back();
  }

}
