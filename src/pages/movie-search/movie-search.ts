import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieApiProvider} from "../../providers/movie-api/movie-api";
import {Observable} from "rxjs/Observable";
import {Movie} from "../../interfaces/Movie";
import {MovieDetailsPage} from "../movie-details/movie-details";


/**
 * Generated class for the MovieSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-search',
  templateUrl: 'movie-search.html',
})
export class MovieSearchPage {
  private search: string;
  private searchResults: Array<Movie>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public movieApiProvider: MovieApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovieSearchPage');
  }

  movieSearch($event: any){
    this.search = $event.target.value;

    this.movieApiProvider.getMoviesBySearch(this.search).subscribe( data => {
      this.searchResults = data.results;
      console.log(data);
    })
  }

  goToDetails(id: string){
    this.navCtrl.push(MovieDetailsPage, {id: id})
  }

}
