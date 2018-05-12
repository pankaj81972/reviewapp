import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import {AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MovieDetailsPage} from "../pages/movie-details/movie-details";
import {HttpClientModule} from "@angular/common/http";
import {MovieApiProvider} from "../providers/movie-api/movie-api";
import {MovieSearchPage} from "../pages/movie-search/movie-search";
import { environment } from "../environments/environment";
import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";
import {AngularFireDatabase} from 'angularfire2/database';
import {UserDetailsProvider} from "../providers/user-details/user-details";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MovieDetailsPage,
    MovieSearchPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MovieDetailsPage,
    MovieSearchPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MovieApiProvider,
    UserDetailsProvider,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}



