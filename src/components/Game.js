import {useGame} from "../contexts/GraphContext"
import React, {useContext, useState, useEffect} from 'react'



export default function Game() {

    const[currentActor, setCurrentActor] = useState(null)
    const[solution, setSolution] = useState(null)
    const[loading, setLoading] = useState(true)


    const { graph } = useGame()

    function structurePath(path){
        let sol = ""
        for (let i = 0; i < path.length; i++){
            i !== 0 ? sol = sol + " => " + path[i].name : sol = path[i].name
        }
        return sol
    }

    useEffect(() => {
        graph.setRandom()
        const paths = (graph.findOptimal())
        setSolution(structurePath(paths))
        setCurrentActor(graph.startActor)
        setLoading(false)
    },[])

    return (
        <div>
            {!loading && solution}
            <div>
                {!loading && graph.endActor.name}
            </div>
            <div>
                {!loading && currentActor.name}
            </div>
        </div>
    )
}
