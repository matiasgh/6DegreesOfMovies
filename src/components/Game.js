import {useGame} from "../contexts/GraphContext"
import React, {useContext, useState, useEffect} from 'react'
import { Card, Button, Row, Col, Container, Image, Alert, ListGroup } from "react-bootstrap"
import {Link, useHistory } from "react-router-dom"
import { BiMovie, BiArrowBack} from "react-icons/bi"
import { FaTheaterMasks } from "react-icons/fa"




export default function Game() {

    const[currentActor, setCurrentActor] = useState(null)
    const[solution, setSolution] = useState(null)
    const[solutionArr, setSolutionArr] = useState(null)
    const[loading, setLoading] = useState(true)
    const[currentMovie, setCurrentMovie] = useState(null)
    const[renderMovie, setRenderMovie] = useState(false)
    const[degree, setDegree] = useState(0)
    const[userPath, setUserPath] = useState([])
    const[gameOver, setGameOver] = useState(false)
    const[time, setTime] = useState(new Date().getTime())
    const[score, setScore] = useState(0)

    const history = useHistory()


    const { graph, allActors, allMovies } = useGame()

    function structurePath(path){
        var sol = ""
        for (let i = 0; i < path.length; i++){
            i !== 0 ? sol = sol + " => " + path[i].name : sol = path[i].name
        }
        return sol
    }

    function calculateScore(){
        var sc = 10000
        sc = degree > 6 ? sc : sc + 5000

        let timePoints = (500-(new Date().getTime()-time))
        timePoints = timePoints>0 ? timePoints : 0

        sc = Math.pow(solutionArr.length/2, 2)*sc
        console.log(solutionArr.length)
        console.log(Math.pow(solutionArr.length/2, 2))
        console.log(sc)
        var div = degree*50
        return parseInt(sc/div)+timePoints+100
    }

    useEffect(() => {
        graph.setRandom()
        let paths = (graph.findOptimal())
        while(paths == null && paths.length <= 4){
            graph.setRandom()
            paths = (graph.findOptimal())
        }
        console.log(paths)
        setSolutionArr(paths)
        setSolution(structurePath(paths))
        setCurrentActor(graph.startActor)
        setLoading(false)
    },[])

    useEffect(() => {
        if(currentActor != null){
            const movies = Array.from(currentActor.movies)
            for (let i = 0; i < movies.length; i++) {
                if(graph.endActor.movies.has(movies[i])){
                    console.log(calculateScore())
                    setScore(calculateScore())
                    setGameOver(true)
                    
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
                        {renderMovie && Array.from(currentMovie.actors).sort().map((actor) => (
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
            <Container className="d-flex align-items-center justify-content-center">
                {gameOver && <Card bg-secondary className="d-flex align-items-center justify-content-center mt-5" style={{maxWidth: "600px"}}>
                    <h2>Game Over</h2>
                    <h4 className="text-success">Congratulations!</h4>
                    <br></br>
                    hello
                    <h2>Score: {score}</h2>
                </Card>}
            </Container>
        </Container>
    )
}
