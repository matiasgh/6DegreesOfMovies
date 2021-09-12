import React, {useContext, useState, useEffect} from 'react'
import app from "../firebase"
import {Movie} from "../graphComponents/Movie"
import {Actor} from "../graphComponents/Actor"
import {Graph} from "../graphComponents/Graph"

const GraphContext = React.createContext()

export function useGame(){
    return useContext(GraphContext)
}

//Gets exported to signup component and triggers whenever user push "Sign Up" button
export function GameProvider({children}) {

    const [graph, setGraph] = useState()
    const [allMovies, setAllMovies] = useState()
    const [allActors, setAllActors] = useState()

    // A loading switch to make sure that "user" will not be used whenever user state is null
    const [loading, setLoading] = useState(true)


    const[currentActor, setCurrentActor] = useState(null)

    const[solution, setSolution] = useState(null)


    const ref = app.firestore().collection("data")
    const tempAllMovies = new Map()
    const tempAllActors = new Map()


    function prepMovies(items){
        const movies = items[1].movies
        movies.forEach((moviesArr, index) =>{
            moviesArr.split("|").forEach((movie, i) =>{
                const line = (movie.split("\t"))

                tempAllMovies.set(line[0].trim(), new Movie(line))
            })
        })
        prepActors(items[0].actors)
    }
    
    
    function prepActors(actors){
        actors.forEach((actorArr, index) =>{
            actorArr.split("|").forEach((actor, i) =>{
                const line = (actor.split("\t"))
                // After splitting the string on tab, i end up getting a empty string on index 2
                //So in order to remove this, i use filter
                const cleansedLine = line.filter(e =>  e)

                if(cleansedLine.length !== 0){
                    const newActor = new Actor(cleansedLine)

                    // Looping threw the movies in the actor, to add Movies and Actors objects in each Actor and Movie
                    for (let i = 2; i < cleansedLine.length; i++) {
                        const m = cleansedLine[i].trim()
                        if(tempAllMovies.has(m)){
                            newActor.addMovie(tempAllMovies.get(m))
                            tempAllMovies.get(m).addActor(newActor)
                        }
                    }
                    
                    if(newActor.movies.size !== 0){
                        tempAllActors.set(cleansedLine[0].trim(), newActor)
                    }
                }                
            })
        })
    }


    useEffect(() => {
        function getData(){
            ref.get().then((item) => {
                const items = item.docs.map((doc) => doc.data())
                prepMovies(items)
                const g = new Graph(tempAllMovies, tempAllActors)
                setGraph(g)
                setAllActors(tempAllActors)
                setAllMovies(tempAllMovies)
                setLoading(false)
    
            })
        }
        getData()

    },[])

    // exports current user and signup fuction so you can do signup requests from signup component
    const game = {
        graph,
        currentActor,
        solution,
        loading,
        allMovies,
        allActors
    }

    //Sets the current user as context, so it can be easly accessed in other components
    return (
        <GraphContext.Provider value={game}>
            {!loading && children}
        </GraphContext.Provider>
    )
}
