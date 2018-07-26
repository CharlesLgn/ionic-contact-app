import {Component, ViewChild} from '@angular/core';
import {NavController, ToastController, LoadingController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {HttpClient} from "@angular/common/http";
// import {DAO} from "../../other/dao";

@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html'
})
export class ConnectionPage {

  @ViewChild('username') user;
  @ViewChild('password') psw;

  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              public http: HttpClient) {

  }

    /**
     * a error that appear on the sreen if the user or the password in incorrect
     */
  showToast() {
      const toast = this.toastCtrl.create({
          message: 'Wrong password and user',
          position: 'bottom',
          duration: 2000
      });

      toast.present();
  }

    /**
     * a false waiting page before seing the connection result
     */
  presentLoading() {
      const loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 100
      });
      loader.present();
  }


    /** verify the Identity of the user
     *  if he exist in the DB we alow hiw to see the users
     *  if not we send him a message
     */
  signIn() {
     //TODO -- remove it when api is done
     this.navCtrl.push(HomePage);
     this.presentLoading();
     /*if(DAO.verifyPasword(this.http, this.user.value, this.psw.value)) {
        this.navCtrl.push(HomePage);
    } else {
        this.showToast();
    }*/
  }
}
