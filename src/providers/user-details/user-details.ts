

import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase/app';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class UserDetailsProvider {

  currentUser={};

  public userAuthState: Observable<any>;
  public logs: boolean;
  public favorites = [];

  constructor(public angularFireAuth: AngularFireAuth, public firebase: AngularFireDatabase){



    this.userAuthState = this.angularFireAuth.authState;

    this.userAuthState.subscribe( res => {
      if (res && res.uid) {
        this.logs = true;
        console.log('user is logged in');
      } else {
        this.logs = false;
        console.log('user not logged in')
      }
    });

  }

  setCurrentUser(user){
    this.currentUser = {
      email: user.email,
      userId: user.uid,
      name: user.displayName,
    }
  }

  getUserDetails(){
    return this.currentUser;
  }

  clearUserData(){
    this.currentUser = {};
  }

  getUserFavorites(){
    let favs = this.firebase.database.ref(`users/${this.angularFireAuth.auth.currentUser.uid}/favorites`).orderByKey();
    favs.once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        let key = childSnapshot.key;
        this.favorites.push(key);
        console.log(key);
        let childData = childSnapshot.val();
        console.log(childData);
      })
    })
  }


}
