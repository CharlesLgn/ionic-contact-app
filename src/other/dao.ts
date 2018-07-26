import {HttpClient, HttpHeaders} from "@angular/common/http";

export class DAO {

    public static createEntry(http: HttpClient, nom : string, prenom: string, tel:string) : void {
        let baseURI : string  = "http://127.0.0.1/ionic-contact-app/";
        let headers: any = new HttpHeaders({'ContentType': 'json', responseType: 'text'}),
            options: any = {
                "key": "create",
                "first_name": nom,
                "last_name": prenom,
                "tel": tel,
            },
            url: any = baseURI + "manage-data.php";
        http.post(url, JSON.stringify(options), headers)
            .subscribe((data: any) => {
                console.log(JSON.parse(data));
                // If the request was successful notify the user
            });
    }

    public static updateEntry(http: HttpClient, id: number, nom : string, prenom: string, tel:string) : void {

        let baseURI : string  = "http://localhost/ionic-contact-app/";
        let headers: any = new HttpHeaders({'ContentType': 'application/json', responseType: 'json'}),
            options: any = {
                "key": "update",
                "id": id,
                "first_name": nom,
                "last_name": prenom,
                "tel": tel
            },
            url: any = baseURI + "manage-data.php";

        http.post(url, JSON.stringify(options), headers)
            .subscribe((data: any) => {
                // If the request was successful notify the user
                console.log(JSON.parse(data));
                console.log(data);
            });
    }


    public static verifyPasword(http: HttpClient, user: string, pasword: string) : boolean {
        let baseURI : string  = "http://localhost/ionic-contact-app/";
        let headers: any = new HttpHeaders({responseType: 'json'}),
            options: any = {'user': user, 'pasword': pasword},
            url: any = baseURI + "pasword.php";
        http.post(url, options, headers)
            .subscribe((data: any) => {
                return (data === '1');
            });
        return false;
    }

}