import { useHistory } from "react-router"
import { BiArrowBack } from "react-icons/bi"
import { useState, useEffect } from "react"
import {useAuth} from "../contexts/AuthContext"
import app from "../firebase"
import { Container, Button, Row, Nav, Card, ListGroup, Col } from "react-bootstrap"

export default function Scoreboard(){

    const[tab, setTab] = useState("your scores")
    const[loading, setLoading] = useState(true)
    const[scores, setScores] = useState([])
    const[highScores, setHighScores] = useState([])
    const[showScores, setShowScores] = useState([])

    const {currentUser} = useAuth()

    const colRef = app.firestore().collection("scores")

    useEffect(() => {
        let unsubscribe = colRef.doc(currentUser.email).get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data())
                var ob = Object.values(doc.data())
                ob.sort((a,b) => parseInt(a[0]) - (b[0]))
                console.log("Document data:", ob)
                setScores(ob.reverse().slice(0,10))
                setShowScores(ob.slice(0,10))

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!")
            }
        }).catch((error) => {
            console.log("Error getting document:", error)
        })

        let unsubscribe2 = colRef.doc("highscores").get().then((doc) => {
            console.log(doc.data())
            var ob = Object.values(doc.data())
            ob.sort((a,b) => parseInt(a[0]) - (b[0]))
            console.log("Document data:", ob)
            setHighScores(ob.reverse())
            
        }).catch((error) => {
            console.log("Error getting collection:", error)
        });

        setLoading(false)

        return () => unsubscribe, unsubscribe2
    },[])

    
    

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


    return(
        <Container fluid>
            <Row style={{backgroundColor: "#333"}}>
                <Button variant="secondary" className="w-25" style={{marginLeft:"150px"}} onClick={scoreboard}>Scoreboard</Button>
                <Button variant="dark" className="w-25" onClick={startGame}>Start Game</Button>
            </Row>
            <h4> <BiArrowBack style={{color:"blue", cursor: "pointer"}} onClick={goHome}/> Back</h4>
            <Container flex>
                <Card>
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
                        {(tab !== "about scores") && <h5 className="mt-5">
                            <Row>
                                <Col>No.</Col><Col>Game Mode</Col><Col>No. of Moves</Col><Col>Optimal No. of Moves</Col><Col style={{textAlign: "right"}}>Score</Col>
                            </Row>
                        </h5>}
                        <ListGroup>
                            {!loading && (tab !== "about scores") && showScores.map((e, index) => (
                                        <ListGroup.Item style={{backgroundColor:"lightblue"}}> 
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <h4>{index+1}.</h4>
                                                    </Col>
                                                    <Col>
                                                        <h5>{e[1]}</h5>
                                                    </Col >
                                                    <Col>
                                                        <h5>{e[2]}</h5>
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