import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { NowPlayingResponse, Movie } from '../interfaces/now_playing-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';
import { MovieResponse } from '../interfaces/movie-response';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private nowPlayingPage: number = 1;
  public loading: boolean = false;

  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: '0060771bc62c2e8a7a7d61bb21114102',
      language: 'es-ES',
      page: this.nowPlayingPage.toString()
    }
  }

  getNowPlaying(): Observable<Movie[]> {

   if(this.loading) {
     // Cargando peliculas
     return of([]);
   } 

    this.loading = true;
    return this.http.get<NowPlayingResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
        map((res) => res.results),
        tap(() => {
          this.nowPlayingPage += 1;
          this.loading = false;
        }));
  }

  searchMovie(termino: string): Observable<Movie[]> {
     const params = {
       ...this.params,
       query: termino,
       page: '1'
     }; 
    return this.http.get<NowPlayingResponse>(`${this.baseUrl}/search/movie`, { params })
               .pipe(map((res) => res.results));
  }

  getMovie(id:string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, { params: this.params })
                .pipe(catchError(err => of(null)));
  }

  getMovieCredits(id: string): Observable<Cast[]> {
    const params = {
      ...this.params,
      page: '1'
    };
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, { params: params})
               .pipe(
                 map((res) => res.cast),
                 catchError(err => of([]))
                 );
  }

  resetNowPlayingPage(): void {
    this.nowPlayingPage = 1;
  }
}
