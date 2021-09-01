export class Actor{

    constructor(list){
        this.id = list[0].trim()
        this.name = list[1]
        this.movies = new Set()
    }

    addMovie(movie){
        this.movies.add(movie)
    }

    getMovies = () =>{
        return this.movies
    }
}