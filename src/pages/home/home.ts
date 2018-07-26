import {Component} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {Contact} from "../../class/model";
import {ConnectionPage} from "../conection/connection";
import {HttpClient} from "@angular/common/http";
import {DAO} from "../../class/dao";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    items: Array<Contact> = [];

    constructor(public navCtrl: NavController,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                public http: HttpClient) {

    }

    /**
     * Triggered when template view is about to be entered
     * Returns and parses the PHP data through the load() method
     *
     * @public
     * @method ionViewWillEnter
     * @return {None}
     */
    ionViewWillEnter() : void {
        this.load();
    }

    /**
     * Retrieve the JSON encoded data from the remote server
     * Using Angular's Http class and an Observable - then
     * assign this to the items array for rendering to the HTML template
     *
     * @public
     * @method load
     * @return {None}
     */
    load() : void {
        this.items = [];
        this.http
            .get('http://127.0.0.1/ionic-contact-app/retrieve-data.php')
            .subscribe((data : any) => {
                    for (let item of data) {
                        this.items.push(new Contact(item.id, item.first_name, item.last_name, item.tel));
                    }
                },
                (error : any) => {
                    console.dir(error);
                });
    }

    public add(id:number, nom :string, prenom :string, num :string) {
        const place = this.deepIndexOf(this.items, (new Contact(id, nom, prenom, num)));

        console.log(id);


        const prompt = this.alertCtrl.create({
            title: 'Login',
            message: "Enter a name for this new album you're so keen on adding",

            inputs: [
                {
                    name: 'nom',
                    placeholder: 'Nom',
                    value: nom
                },
                {
                    name: 'prenom',
                    placeholder: 'Prenom',
                    value: prenom,
                },
                {
                    name: 'num',
                    placeholder: 'Telephone',
                    value: num,
                },
            ],
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Save',
                    handler: data => {
                        if (data.nom == '' || data.prenom == '' || data.num == ''){
                            this.showToast();
                            return false;
                        } else {
                            const contact = new Contact(data.id, data.nom, data.prenom, data.num);
                            if (place === -1) {
                                DAO.createEntry(this.http, data.nom, data.prenom, data.num);
                                this.load()

                            } else {
                                this.items[place] = contact;
                            }
                        }
                    }
                }
            ]
        });
        prompt.present();
    }


    public goConnectionPage() {
        this.navCtrl.popTo(ConnectionPage);
    }

    showToast() {
        const toast = this.toastCtrl.create({
            message: 'you must fill all fields',
            position: 'bottom',
            duration: 2000
        });
        toast.present();
    }

    private deepIndexOf(arr, obj) {
        return arr.findIndex(function (cur) {
            return Object.keys(obj).every(function (key) {
                return obj[key] === cur[key];
            });
        });
    }
}
