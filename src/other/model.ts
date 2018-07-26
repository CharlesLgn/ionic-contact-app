export class Contact {
    id: number;
    nom: string;
    prenom: string;
    num: string;

    constructor(id:number, nom: string, prenom: string, num: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.num = num;
    }
}