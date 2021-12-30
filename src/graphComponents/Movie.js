
export class Movie {
    constructor(list){
        this.id = list[0].trim()
        this.name = list[1]
        this.rating = parseFloat((list[2].replace(".","")), 10)/10
        this.votes = parseInt(list[3], 10)
        this.picture = list[4].trim()
        this.actors = new Set()
    }

    addActor(actor){
        this.actors.add(actor)
    }
}
