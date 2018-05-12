import { Component, ViewChild } from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';

import { ListPage } from '../pages/list/list';
import {MovieDetailsPage} from "../pages/movie-details/movie-details";
import {MovieSearchPage} from "../pages/movie-search/movie-search";
import {Observable} from 'rxjs/Observable';
import {User} from 'firebase/app';
import {UserDetailsProvider} from '../providers/user-details/user-details';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  // loggedIn: boolean;
  mockPage: any;


  pages: Array<{title: string, component: any}>;

  constructor(public angularFireAuth: AngularFireAuth,
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private log: UserDetailsProvider,
             // private navCtrl: NavController

  ) {this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
     // { title: 'Login', component: LoginPage }
    ];
    this.mockPage = { title: 'Login', component: LoginPage }
  }

  initializeApp() {
    // this.splashScreen.show();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  signOut(){
    this.angularFireAuth.auth.signOut();
  }
}
