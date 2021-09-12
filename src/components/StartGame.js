import { Button, Col, Container } from "react-bootstrap"
import {useGame} from "../contexts/GraphContext"



export default function StartGame( {setSolution, setCurrentActor, setUserPath, setLoading }){

    const { graph } = useGame()

    function initiateGame(difficulty){
        difficulty === "easy" ? graph.setRandomEasy(): difficulty === "medium" ? graph.setRandomMedium(): graph.setRandom()
        let paths = (graph.findOptimal())
        while(paths == null || paths.length <= 4){
            console.log("hey")
            difficulty === "easy" ? graph.setRandomEasy(): difficulty === "medium" ? graph.setRandomMedium(): graph.setRandom()
            paths = (graph.findOptimal())
        }
        console.log(paths.reverse())
        setSolution(paths)
        setCurrentActor(graph.startActor)
        var up = []
        up.push(graph.startActor)
        setUserPath(up)
        setLoading(false)
    }


    return(
        <>
        <h2 className="text-center mb-5">Helo From Start Game</h2>
        <Container className="d-flex align-items-center justify-content-center mb-5">
            <Col style ={{maxWidth: "400px"}}>
            <Button variant="success" className="w-100 mb-3" onClick={() => initiateGame("easy")}>Easy</Button>
            <Button variant="warning" className="w-100 mb-3" onClick={() => initiateGame("medium")}>Medium</Button>
            <Button variant="danger" className="w-100 mb-3" onClick={() => initiateGame("hard")}>Hard</Button>
            </Col>
        </Container>
        </>
    )
}