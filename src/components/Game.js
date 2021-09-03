import {useGame} from "../contexts/GraphContext"
import React, {useContext, useState, useEffect} from 'react'
import { Card, Button, Row, Col, Container, Image, Alert, ListGroup } from "react-bootstrap"
import {Link, useHistory } from "react-router-dom"




export default function Game() {

    const[currentActor, setCurrentActor] = useState(null)
    const[solution, setSolution] = useState(null)
    const[loading, setLoading] = useState(true)
    const[currentMovie, setCurrentMovie] = useState(null)
    const[renderMovie, setRenderMovie] = useState(false)

    const history = useHistory()


    const { graph, allActors, allMovies } = useGame()

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
        console.log(allMovies)
    },[])

    function startGame(){
        history.push("/game")
    }

    function goHome(){
        history.push("/")
    }

    function goMovie(id){
        var m = allMovies.get(id)
        setCurrentMovie(m)
        setRenderMovie(true)

    }

    function goActor(id){
        var a = allActors.get(id)
        setCurrentActor(a)
        setRenderMovie(false)
    }


    return (
        <Container fluid>
            <Row style={{backgroundColor: "#333"}}>
                <Button variant="dark" className="w-25" onClick={goHome} style={{marginLeft:"150px"}}>Home</Button>
                <Button variant="secondary" className="w-25" onClick={startGame}>Start Game</Button>
                <Button variant="info" className="w-25">Scoreboard</Button>
            </Row>
            {!loading && solution}
            <div>
                {!loading && graph.endActor.name}
            </div>
            <div>
                {!loading && currentActor.name}
            </div>
            <ListGroup>
                {!loading && !renderMovie && Array.from(currentActor.movies).map((movie) => (
                <ListGroup.Item action onClick={() => goMovie(movie.id)}>{movie.name}</ListGroup.Item>
                ))}
            </ListGroup>
            <ListGroup>
                {!loading && renderMovie && Array.from(currentMovie.actors).map((actor) => (
                <ListGroup.Item action onClick={() => goActor(actor.id)}>{actor.name}</ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}
