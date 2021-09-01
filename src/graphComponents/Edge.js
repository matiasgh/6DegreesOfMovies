export class Edge{

    constructor(actorFrom, actorTo, movie){
        this.actorFrom = actorFrom
        this.actorTo = actorTo
        this.movie = movie
        this.wight = null
        if(movie != null){
            this.weight = movie.rating
        }
    }

}