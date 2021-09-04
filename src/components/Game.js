import {useGame} from "../contexts/GraphContext"
import React, {useContext, useState, useEffect} from 'react'
import { Card, Button, Row, Col, Container, Image, Alert, ListGroup } from "react-bootstrap"
import {Link, useHistory } from "react-router-dom"
import { BiMovie, BiArrowBack} from "react-icons/bi"
import { FaTheaterMasks } from "react-icons/fa"




export default function Game() {

    const[currentActor, setCurrentActor] = useState(null)
    const[solution, setSolution] = useState(null)
    const[loading, setLoading] = useState(true)
    const[currentMovie, setCurrentMovie] = useState(null)
    const[renderMovie, setRenderMovie] = useState(false)
    const[degree, setDegree] = useState(0)
    const[userPath, setUserPath] = useState([])

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
        let paths = (graph.findOptimal())
        while(paths == null){
            graph.setRandom()
            paths = (graph.findOptimal())
        }
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
        setDegree(degree+1)

    }

    function goActor(id){
        var a = allActors.get(id)
        setCurrentActor(a)
        setRenderMovie(false)
    }


    return (
        
        <Container fluid>
            <Row style={{backgroundColor: "#333"}}>
                <Button variant="secondary" className="w-25" style={{marginLeft:"150px"}}>Scoreboard</Button>
                <Button variant="dark" className="w-25" onClick={startGame}>Start Game</Button>
            </Row>
            <h4> <BiArrowBack style={{color:"blue", cursor: "pointer"}} onClick={goHome}/> Back</h4>
            {!loading && <Container fluid>
                <h4 style={{color: "black", display: 'flex',  justifyContent:'center', alignItems:'center'}}>Moves: {degree}</h4>
                <br/>
                <h4 style={{color: "grey", display: 'flex',  justifyContent:'center', alignItems:'center'}}>Current {renderMovie ? "Movie: " + currentMovie.name : "Actor: " + currentActor.name}</h4>
            </Container>}
            {!loading && <Container className="d-flex align-items-center justify-content-center mb-5">
                <Card style ={{maxWidth: "1000px", minWidth: "400px", maxHeight: "300px", marginBottom:"50px"}} class="overflow-auto">
                    <div className="overflow-auto">
                    <ListGroup>
                        {!renderMovie && Array.from(currentActor.movies).map((movie) => (
                        <ListGroup.Item action onClick={() => goMovie(movie.id)}> 
                            <h6>
                                <Row>
                                    <Col>
                                        <BiMovie style={{color:"black"}} style={{marginRight:"20px"}}/>
                                        {movie.name}
                                    </Col>
                                    <Col md="auto">
                                        {movie.rating}
                                    </Col>
                                    <Col md="auto">
                                        {movie.votes}
                                    </Col>
                                </Row>
                            </h6>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <ListGroup>
                        {renderMovie && Array.from(currentMovie.actors).map((actor) => (
                        <ListGroup.Item action onClick={() => goActor(actor.id)}>
                            <h6>
                                <FaTheaterMasks style={{color:"black"}} style={{marginRight:"20px"}}/>  
                                {actor.name}
                            </h6>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    </div>
                </Card>
            </Container>}
        </Container>
    )
}
