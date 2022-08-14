import { useHistory } from "react-router"
import { BiArrowBack } from "react-icons/bi"
import { useState, useEffect } from "react"
import {useAuth} from "../contexts/AuthContext"
import app from "../firebase"
import { Container, Button, Row, Nav, Card, ListGroup, Col, Dropdown } from "react-bootstrap"

export default function Scoreboard(){

    const[tab, setTab] = useState("your scores")
    const[loading, setLoading] = useState(true)
    const[scores, setScores] = useState([[]])
    const[highScores, setHighScores] = useState([[]])
    const[showScores, setShowScores] = useState([[]])
    const[difficulty, setDificulty] = useState("easy")
    const[difficultyIndex, setDifficultyIndex] = useState(0)

    const {currentUser} = useAuth()

    const colRef = app.firestore().collection("scores")

    useEffect(() => {
        let unsubscribe = colRef.doc(currentUser.email).get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data().easy)
                let easy = makeScoreObjects(doc.data().easy)
                let medium = makeScoreObjects(doc.data().medium)
                let hard = makeScoreObjects(doc.data().hard)
                let arr = [easy, medium, hard]
                setScores(arr)
                setShowScores(arr)
                console.log(arr)

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!")
            }
        }).catch((error) => {
            console.log("Error getting document:", error)
        })

        let unsubscribe2 = colRef.doc("highscores").get().then((doc) => {
            console.log(doc.data())
            let easy = makeScoreObjects(doc.data().easy)
            let medium = makeScoreObjects(doc.data().medium)
            let hard = makeScoreObjects(doc.data().hard)
            let arr = [easy, medium, hard]
            setHighScores(arr)
            
        }).catch((error) => {
            console.log("Error getting collection:", error)
        });

        setLoading(false)

        return () => unsubscribe, unsubscribe2
    },[])

    
    function makeScoreObjects(scores) {
        let arr = scores.map((e) => {
            return e.split("|")
         })
         var ob = Object.values(arr)

         ob.sort((a,b) => parseInt(a[0]) - (b[0]))
         console.log("Document data:", ob)
         return(ob.reverse().slice(0,10))
    }

    function startGame(){
        history.push("/game")
    }

    const history = useHistory()


    function scoreboard(){
        history.push("/scoreboard")
    }

    function goHome(){
        history.push("/")
    }

    function yourScores(){
        setShowScores(scores)
        setTab("your scores")
    }

    function toppScores(){
        setShowScores(highScores)
        setTab("high scores")
    }

    function aboutScores(){
        setTab("about scores")
    }
    function handleSelect(e) {
        if (e == "easy") setDifficultyIndex(0);
        if (e == "medium") setDifficultyIndex(1);
        if (e == "hard") setDifficultyIndex(2);

        setDificulty(e)
    }


    return(
        <Container fluid>
            <Row style={{backgroundColor: "#333"}}>
                <Button variant="secondary" className="w-25" style={{marginLeft:"150px"}} onClick={scoreboard}>Scoreboard</Button>
                <Button variant="dark" className="w-25" onClick={startGame}>Start Game</Button>
            </Row>
            <h4> <BiArrowBack style={{color:"blue", cursor: "pointer"}} onClick={goHome}/> Back</h4>
            <Container flex>
                <Card style={{backgroundColor:"lightgrey"}}>
                    <Nav variant="tabs" fill>
                        <Nav.Item>
                            <Nav.Link style={{color:"black", backgroundColor: "lightpink"}} onClick={yourScores}>
                                <h5>Your scores</h5>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{color:"black", backgroundColor: "lightcoral"}} onClick={toppScores}>
                                <h5>High Scores</h5>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{color:"black", backgroundColor: "indianred"}} onClick={aboutScores}>
                                <h5>About scores</h5>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Card.Body>
                    <Dropdown 
                        onSelect={handleSelect}
                    >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {difficulty}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="easy">easy</Dropdown.Item>
                            <Dropdown.Item eventKey="medium">medium</Dropdown.Item>
                            <Dropdown.Item eventKey="hard">hard</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                        {(tab !== "about scores") && <h5 className="mt-5">
                            <Row>
                                <Col>No.</Col><Col>User Name</Col><Col>Game Mode</Col><Col>No. of Moves</Col><Col>Optimal No. of Moves</Col><Col style={{textAlign: "right"}}>Score</Col>
                            </Row>
                        </h5>}
                        <ListGroup>
                            {!loading && (tab !== "about scores") && showScores[difficultyIndex].map((e, index) => (
                                        <ListGroup.Item style={{backgroundColor:"lightblue"}}> 
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <h4>{index+1}.</h4>
                                                    </Col>
                                                    <Col>
                                                        <h4>{e[1]}</h4>
                                                    </Col>
                                                    <Col>
                                                        <h5>{difficulty}</h5>
                                                    </Col >
                                                    <Col>
                                                        <h5>{e[3]}</h5>
                                                    </Col>
                                                    <Col> 
                                                        <h5>{e[3]}</h5>
                                                    </Col>
                                                    <Col style={{textAlign: "right"}}>
                                                        <h4>{e[0]}</h4>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </ListGroup.Item>
                                        ))}
                        </ListGroup>
                        {tab === "about scores" && <p>about scores</p>}
                    </Card.Body>
                </Card>
            </Container>   
        </Container>

    )
}