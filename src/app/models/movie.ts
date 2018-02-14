export class Movie {
    public idMovieDb : number;
    constructor(public title : string, 
        public director : string, 
        public cinema: boolean, 
        public date : number, 
        public rating : number, 
        public imageUrl: string, 
        public comment: string,
        public releaseDate : number) {
    }
}