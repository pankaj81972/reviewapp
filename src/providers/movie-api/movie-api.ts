import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import 'rxjs';

@Injectable()
export class MovieApiProvider {

  movieSearchQueryBaseUrl: string = 'https://api.themoviedb.org/3/search/movie';
  movieSearchBaseUrl: string = 'https://api.themoviedb.org/3/movie/';
  discoverMoviesBaseUrl: string = 'https://api.themoviedb.org/3/discover/movie';
  moviePosterBaseUrl: string = 'https://image.tmdb.org/t/p/w500';
  youtubeBaseUrl = 'https://www.youtube.com/watch?v=';
  apiKey = "?api_key=74cff56e7a570daac9b5d7fae1093dc0";
  movies: any = {};
  trailers: any = {};


  constructor(private http: HttpClient) {
  }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.movieSearchBaseUrl}popular${this.apiKey}`)
      .map((response: Response) => {
        this.movies = response;
        console.log(this.movies);
        return this.movies;
      });
  }

  getMoviesByCompany(companyId: string, releaseYear?: string): Observable<any>{
    if (releaseYear){
      return this.http.get(`${this.discoverMoviesBaseUrl}${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_companies=${companyId}&primary_release_year=${releaseYear}`)
        .map((response: Response) => {
          this.movies = response;
          console.log(this.movies);
          return this.movies;
        })
    }
    else{
      return this.http.get(`${this.discoverMoviesBaseUrl}${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_companies=${companyId}`)
        .map((response: Response) => {
          this.movies = response;
          console.log(this.movies);
          return this.movies;
        })
    }

  }

  getMoviesBySearch(search: string): Observable<any> {
    return this.http.get(`${this.movieSearchQueryBaseUrl}${this.apiKey}&language=en-US&query=${search}&page=1&include_adult=false`)
      .map((response: Response) => {
        this.movies = response;
        console.log(this.movies);
        return this.movies;
      })
  }

    getMoviesByGenre(genreId: string, releaseYear?: string){
      if (releaseYear){
        return this.http.get(`${this.discoverMoviesBaseUrl}${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${releaseYear}&with_genres=${genreId}`)
          .map((response: Response) => {
            this.movies = response;
            console.log(this.movies);
            return this.movies;
          })
      }
      else{
        return this.http.get(`${this.discoverMoviesBaseUrl}${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`)
          .map((response: Response) => {
            this.movies = response;
            console.log(this.movies);
            return this.movies;
          })
      }
    }

  getPosterPath(pathUrl: string){
    return `${this.moviePosterBaseUrl}${pathUrl}`;
  }

  getMovieById(id: number): Observable<any> {
    return this.http.get(`${this.movieSearchBaseUrl}${id}${this.apiKey}`);
  }

  getBackdropPath(pathUrl: string){
    return `${this.moviePosterBaseUrl}${pathUrl}`;
  }

  getMovieTrailers(mId){
    return this.http.get(`https://api.themoviedb.org/3/movie/${mId}/videos${this.apiKey}`)
      .map((response: Response) => {
      this.trailers = response;
      return this.trailers;
      })
  }

  getTrailerUrl(trailerKey){
    return `${this.youtubeBaseUrl}${trailerKey}`
  }

}
