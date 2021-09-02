import {useGame} from "../contexts/GraphContext"
import React, {useContext, useState, useEffect} from 'react'
import { Card, Button, Row, Col, Container, Image, Alert, ListGroup } from "react-bootstrap"
import {Link, useHistory } from "react-router-dom"




export default function Game() {

    const[currentActor, setCurrentActor] = useState(null)
    const[solution, setSolution] = useState(null)
    const[loading, setLoading] = useState(true)

    const history = useHistory()


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

    function startGame(){
        history.push("/game")
    }

    function goHome(){
        history.push("/")
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
                {!loading && Array.from(currentActor.movies).map((movie) => (
                <ListGroup.Item>{movie.name}</ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}
