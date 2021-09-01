import {Edge} from "./Edge"


export class Graph{

    constructor(movies, actors){
        this.movies = movies
        this.actors = actors
        this.startActor = null
        this.endActor = null

    }

    setRandom(){

        let arrActors = Array.from(this.actors.values())
        this.endActor = arrActors[Math.floor(Math.random() * arrActors.length)]
        this.startActor = arrActors[Math.floor(Math.random() * arrActors.length)]
        
        while(this.endActor.id === this.startActor.id){
            this.startActor = arrActors[Math.floor(Math.random() * arrActors.length)]
        }
        
        return this.startActor, this.endActor
    }

    findOptimal(){
        const queue = []
        const visited = new Set()
        const paths = new Map()

        queue.push(this.startActor)

        while(queue.length !== 0){
            let tempActor = queue.shift()
            visited.add(tempActor.id)

            var m = Array.from(tempActor.getMovies())
            
            for (let i = 0; i < m.length; i++){

                if(visited.has(m[i].id)){
                    return;
                }

                var a = Array.from(m[i].actors)

                for (let e = 0; e < a.length; e++){
                    if(!visited.has(a[e].id)){
                        queue.push(a[e])
                        visited.add(a[e].id)
                        const tempEdge = new Edge(tempActor, a[e], m[i])
                        paths.set(a[e].id, tempEdge)

                        if(a[e].id == this.endActor.id){
                            return this.findPath(paths)
                        }
                    }
                }
            }
        }
        return null

    }

    findPath(paths){
        let path = []

        let actor = this.endActor
        path.push(actor)
        while(actor.id != this.startActor.id){
            var edge = paths.get(actor.id)
            path.push(edge.movie)
            path.push(edge.actorFrom)
            actor = edge.actorFrom
        }
        return path
    }
}