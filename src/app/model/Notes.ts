export class Notes {
    id:number;
    date:Date;
    note:string;

    
    _bc_color:string;
    constructor(date?,note?){
        this.date = date;
        this.note = note;
    }
}