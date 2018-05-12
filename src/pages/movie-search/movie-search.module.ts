import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieSearchPage } from './movie-search';

@NgModule({
  declarations: [
    MovieSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieSearchPage),
  ],
})
export class MovieSearchPageModule {}
