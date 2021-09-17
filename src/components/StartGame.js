import { Button, Card, Col, Container } from "react-bootstrap"
import {useGame} from "../contexts/GraphContext"



export default function StartGame( {setSolution, setCurrentActor, setUserPath, setLoading, setBaseScore}){

    const { graph } = useGame()

    function initiateGame(difficulty){
        // Setting up different difficulties in graph
        difficulty === "easy" ? graph.setRandomEasy(): difficulty === "medium" ? graph.setRandomMedium(): graph.setRandom()
        // Setting up base score for different difficultis 
        difficulty === "easy" ? setBaseScore(5000): difficulty === "medium" ? setBaseScore(7500): setBaseScore(10000)
        let paths = (graph.findOptimal())
        while(paths == null || paths.length <= 4){
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
        <h2 className="text-center mb-5" style={{textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: "bold"}}>Select your Diffculty</h2>
        <Container className="d-flex align-items-center justify-content-center mb-5" style ={{maxWidth: "750px"}}>
                <Col>
                    <Card style={{backgroundColor: "yellowgreen"}}>
                        <Card.Body style ={{maxHeight: "300px", overflowY: "auto", overflowX: "hidden"}}>
                            <h2 className="text-center">Easy</h2>
                            <h5 className="m-4" style={{color:"royalblue", textAlign: "center", fontStyle: 'italic'}}>Start-actor: Known</h5>
                            <h5 className="m-4" style={{color:"royalblue", textAlign: "center", fontStyle: 'italic'}}>End-actor:<br/> Known</h5>
                        </Card.Body>
                        <Button variant="success" className="w-100 mb-3" onClick={() => initiateGame("easy")}>Easy</Button>
                    </Card>
                </Col>
                <Col>
                    <Card style={{backgroundColor: "khaki"}}>
                        <Card.Body style ={{maxHeight: "280px", overflowY: "auto", overflowX: "hidden"}}>
                            <h2 className="text-center">Medium</h2>
                            <h5 className="m-4" style={{color:"royalblue", textAlign: "center", fontStyle: 'italic'}}>Start-actor: Random</h5>
                            <h5 className="m-4" style={{color:"royalblue", textAlign: "center", fontStyle: 'italic'}}>End-actor:<br/> Known</h5>
                        </Card.Body>
                        <Button variant="warning" className="w-100 mb-3" onClick={() => initiateGame("medium")}>Medium</Button>
                    </Card>
                </Col>
                <Col>
                    <Card style={{backgroundColor: "lightpink"}}>
                        <Card.Body style ={{maxHeight: "280px", overflowY: "auto", overflowX: "hidden"}}>
                            <h2 className="text-center">Hard</h2>
                            <h5 className="m-4" style={{color:"royalblue", textAlign: "center", fontStyle: 'italic'}}>Start-actor: Random</h5>
                            <h5 className="m-4" style={{color:"royalblue", textAlign: "center", fontStyle: 'italic'}}>End-actor: Random</h5>
                        </Card.Body>
                        <Button variant="danger" className="w-100 mb-3" onClick={() => initiateGame("hard")}>Hard</Button>
                    </Card>
                </Col>
        </Container>
        </>
    )
}