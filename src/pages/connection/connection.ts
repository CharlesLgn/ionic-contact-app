import {Component, ViewChild} from '@angular/core';
import {NavController, ToastController, LoadingController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {HttpClient} from "@angular/common/http";
import {DAO} from "../../class/dao";

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

  showToast() {
      const toast = this.toastCtrl.create({
          message: 'Wrong password and user',
          position: 'bottom',
          duration: 2000
      });

      toast.present();
  }

  presentLoading() {
      const loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 100
      });
      loader.present();
  }

  signIn() {
    console.log(this.user.value);
    this.presentLoading();
    if(DAO.verifyPasword(this.http, this.user.value, this.psw.value)) {
      this.navCtrl.push(HomePage);
    } else {
      this.showToast();
    }
  }
}
