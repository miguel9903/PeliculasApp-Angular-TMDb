import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../interfaces/now_playing-response';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  movies: Movie[] = [];
  termino: string = '';
  loading: boolean = false;

  constructor( private moviesService: MoviesService,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.moviesService.searchMovie(params.termino)
           .subscribe(movies => {
             this.movies = movies;
             this.termino = params.termino;
             this.loading = false;
           });
    });
  }

}
