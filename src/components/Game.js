import {useGame} from "../contexts/GraphContext"
import GameOver from "./GameOver"
import StartGame from "./StartGame"
import React, {useState, useEffect} from 'react'
import { Card, Button, Row, Col, Container, ListGroup } from "react-bootstrap"
import { useHistory } from "react-router-dom"
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
    const[gameOver, setGameOver] = useState(false)
    const[time, setTime] = useState(Date.now())
    const[score, setScore] = useState(0)

    const history = useHistory()


    const { graph, allActors, allMovies } = useGame()


    function calculateScore(){
        var sc = 10000
        sc = degree > 6 ? sc : sc + 5000
        let timePoints = (500-((Date.now() - time) /1000))
        timePoints = timePoints>0 ? timePoints : 0

        sc = Math.pow(solution.length/2, 2)*sc
        var div = degree*50
        return parseInt((sc/div)+timePoints+100)
    }

    const initiateSetSolution = (state) =>{
        setSolution(state)
    }

    const initiateSetCurrentActor = (state) =>{
        setCurrentActor(state)
    }

    const initiateSetUserPath = (state) =>{
        setUserPath(state)
    }

    const initiateSetLoading = (state) =>{
        setLoading(state)
    }


    useEffect(() => {
        if(currentActor != null){
            const movies = Array.from(currentActor.movies)
            for (let i = 0; i < movies.length; i++) {
                if(graph.endActor.movies.has(movies[i])){
                    console.log(calculateScore())
                    setScore(calculateScore())
                    var up = userPath
                    up.push(graph.endActor)
                    setUserPath(up)
                    setGameOver(true)
                    break
                }
            }
        }
    },[currentMovie])

    function startGame(){
        history.push("/game")
    }

    function goHome(){
        history.push("/")
    }

    function goMovie(id){
        var m = allMovies.get(id)
        setCurrentMovie(m)
        var up = userPath
        up.push(m)
        setUserPath(up)
        setRenderMovie(true)
        setDegree(degree+1)

    }

    function goActor(id){
        var a = allActors.get(id)
        setCurrentActor(a)
        var up = userPath
        up.push(a)
        setUserPath(up)
        setRenderMovie(false)
    }


    return (
        
        <Container fluid>
            <Row style={{backgroundColor: "#333"}}>
                <Button variant="secondary" className="w-25" style={{marginLeft:"150px"}}>Scoreboard</Button>
                <Button variant="dark" className="w-25" onClick={startGame}>Start Game</Button>
            </Row>
            <h4> <BiArrowBack style={{color:"blue", cursor: "pointer"}} onClick={goHome}/> Back</h4>
            {loading && <StartGame setSolution={initiateSetSolution} setCurrentActor={initiateSetCurrentActor} setUserPath={initiateSetUserPath} setLoading={initiateSetLoading}/>}
            {!loading && !gameOver && <Container fluid style={{maxWidth: "1000px"}}>
                <Row>
                    <Col className = "text-center">
                        <h5>Start actor:</h5>
                        {graph.startActor.name}
                    </Col>
                    <Col className = "text-center">
                        <h4 style={{color: "black", display: 'flex',  justifyContent:'center', alignItems:'center'}}>Moves: {degree}</h4>
                        <br/>
                        <h4 style={{color: "grey", display: 'flex',  justifyContent:'center', alignItems:'center'}}>Current {renderMovie ? "Movie: " + currentMovie.name : "Actor: " + currentActor.name}</h4>
                    </Col>
                    <Col className = "text-center">
                        <h5>Actor to find:</h5>
                        {graph.endActor.name}
                    </Col>
                </Row>
            </Container>}
            {!loading && !gameOver && <Container className="d-flex align-items-center justify-content-center mb-5">
                <Card style ={{maxWidth: "1000px", minWidth: "400px", maxHeight: "300px", marginBottom:"50px"}}>
                    <div className="overflow-auto">
                    <ListGroup>
                        {!renderMovie && Array.from(currentActor.movies).sort().map((movie) => (
                        <ListGroup.Item action onClick={() => goMovie(movie.id)}> 
                            <h6>
                                <Row>
                                    <Col>
                                        <BiMovie style={{color:"black", marginRight:"20px"}}/>
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
                        {renderMovie && Array.from(currentMovie.actors).sort().map((actor) => (
                        <ListGroup.Item action onClick={() => goActor(actor.id)}>
                            <h6>
                                <FaTheaterMasks style={{color:"black", marginRight:"20px"}}/>  
                                {actor.name}
                            </h6>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    </div>
                </Card>
            </Container>}
            {gameOver && <GameOver score={score} solution={solution} userPath={userPath}/>}
        </Container>
    )
}
