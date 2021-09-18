import {Edge} from "./Edge"


export class Graph{

    constructor(movies, actors){
        this.movies = movies
        this.actors = actors
        this.startActor = null
        this.endActor = null
        this.famousActors = [
            "nm3053338","nm0000138","nm1706767","nm0000190","nm0614165","nm0000354","nm0000151","nm0000093","nm0000134"
            ,"nm0000323","nm0000288","nm0000158","nm0000199","nm0001570","nm0000246","nm0000148","nm0000136","nm0000146","nm0000098"
            ,"nm0000197","nm0000228","nm0000168","nm0000380","nm0362766","nm0331516","nm0000129","nm0000114","nm0350453","nm0330687"
            ,"nm0749263","nm0000553","nm0000172","nm0000123","nm0000128","nm0915989","nm0000437","nm0000179","nm0177896","nm0000209"
            ,"nm0000243","nm0001618","nm0000353","nm0001030","nm0000255","nm0001467","nm0000195","nm0910607","nm0000619","nm0000453"
            ,"nm0005132","nm0089217","nm1055413","nm0000592","nm0000640","nm0000164","nm0000614","nm0001602","nm0000582","nm0000242"
            ,"nm0005562","nm0000401","nm0000206","nm0000008","nm0001745","nm0000332","nm0185819","nm0000375","nm0001321",
            ,"nm0000226","nm0000245","nm0004778","nm0000237","nm0000120","nm0000125","nm0001330","nm0000606","nm0001191","nm0000092"
            ,"nm0000704","nm1212722","nm0000115","nm0000071","nm0425005","nm0000949","nm0000204","nm0000235","nm0000307","nm0000194"
            ,"nm0000173","nm1297015","nm2225369","nm0000054","nm0004266","nm0000006","nm0010736","nm0914612","nm0000124","nm0000701"
            ,"nm0000210","nm0842770","nm0424060","nm0001401","nm0488953","nm0000402","nm0647634","nm5397459","nm0350454"
        ]

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

    setRandomEasy(){
        this.endActor = this.actors.get(this.famousActors[Math.floor(Math.random() * this.famousActors.length)])
        this.startActor = this.actors.get(this.famousActors[Math.floor(Math.random() * this.famousActors.length)])

        while(this.endActor.id === this.startActor.id){
            this.startActor = this.famousActors[Math.floor(Math.random() * this.famousActors.length)]
        }
        
        return this.startActor, this.endActor
    }

    setRandomMedium(){
        let arrActors = Array.from(this.actors.values())
        this.startActor = arrActors[Math.floor(Math.random() * arrActors.length)]
        this.endActor = this.actors.get(this.famousActors[Math.floor(Math.random() * this.famousActors.length)])

        while(this.endActor.id === this.startActor.id){
            this.startActor = this.famousActors[Math.floor(Math.random() * this.famousActors.length)]
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

                        if(a[e].id === this.endActor.id){
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
        while(actor.id !== this.startActor.id){
            var edge = paths.get(actor.id)
            path.push(edge.movie)
            path.push(edge.actorFrom)
            actor = edge.actorFrom
        }
        return path
    }
}