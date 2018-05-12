import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase/app";
import {HomePage} from "../home/home";
import {AngularFireDatabase} from "angularfire2/database";
import {UserDetailsProvider} from "../../providers/user-details/user-details";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'

})

export class LoginPage {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  loginMode: boolean = true;
  currentUser;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private navCtrl: NavController,
    private firebase: AngularFireDatabase,
    private userDetails: UserDetailsProvider){

    // if(this.angularFireAuth.auth.currentUser){
    //   this.angularFireAuth.auth.getRedirectResult().then(result => {
    //     this.currentUser = this.angularFireAuth.auth.currentUser.uid;
    //
    //     this.firebase.object(`users/${this.currentUser}`).set({
    //       userId: this.angularFireAuth.auth.currentUser.displayName,
    //       email: this.angularFireAuth.auth.currentUser.email,
    //       //password: this.password,
    //       favorites: []
    //     });
    //   })
    // }

  }

  login(){
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(result => {
      this.currentUser = this.angularFireAuth.auth.currentUser.uid;

      this.angularFirestore.collection('users').add({name: name}).then(data=> {
        console.log(data);
        this.navCtrl.setRoot(HomePage);
        console.log(this.angularFireAuth.auth.currentUser);
        this.userDetails.setCurrentUser(this.angularFireAuth.auth.currentUser);
      });
    });
  }

  fbLogin(){
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(result => {
      this.currentUser = this.angularFireAuth.auth.currentUser.uid;

      this.firebase.object(`users/${this.currentUser}`).set({
        username: this.angularFireAuth.auth.currentUser.displayName,
        email: this.angularFireAuth.auth.currentUser.email
      });
    });
  }

  googleLogin(){
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(result => {
      this.currentUser = this.angularFireAuth.auth.currentUser.uid;

      this.firebase.object(`users/${this.currentUser}`).set({
        username: this.angularFireAuth.auth.currentUser.displayName,
        email: this.angularFireAuth.auth.currentUser.email
      });
    });
  }

  toggleLoginMode() {
    this.loginMode = !this.loginMode;
  }

 signUp(){
   this.angularFireAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(result => {
     this.firebase.object(`users/${this.angularFireAuth.auth.currentUser.uid}`).set({
       username: this.username,
       email: this.angularFireAuth.auth.currentUser.email
     });
   });


   this.navCtrl.setRoot(HomePage);

  }

}


