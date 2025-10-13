//import {v4 as uuidv4} from "uuid";


class Media {
    readonly title: string;
    readonly genre: string;
    readonly runtime: string;
    readonly rating: string;
    //readonly uuid;


    constructor(title: string, genre: string, runtime: string, rating: string) {
        this.title = title;
        this.genre = genre;
        this.runtime = runtime;
        this.rating = rating;
        //this.uuid = uuidv4;
    }
}

export { Media };