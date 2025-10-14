class Media {
    readonly title: string;
    readonly genre: string;
    readonly runtime: string;
    readonly rating: string;

    constructor(title: string, genre: string, runtime: string, rating: string) {
        this.title = title;
        this.genre = genre;
        this.runtime = runtime;
        this.rating = rating;
    }
}

export { Media };
