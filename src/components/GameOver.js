import { BiMovie } from "react-icons/bi"
import { FaTheaterMasks } from "react-icons/fa"
import { Card, Row, Col, Container, ListGroup } from "react-bootstrap"
import {Movie} from "../graphComponents/Movie"


export default function GameOver({ score, solution, userPath }) {



    return (  
        <Container fluid>
            <h2 className = "text-center">Game Over</h2>
                <h4 className="text-success text-center">Congratulations!</h4>
                <br></br>
                <h2 className = "text-center">Score: {score}</h2>
                <br/>
                <Container className="d-flex align-items-center justify-content-center mb-5"> 
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>   
                    <Card border="info" bg="light" style ={{maxWidth: "1000px", minWidth: "650px", maxHeight: "300px", marginBottom:"50px"}}>
                        <div style={{overflowY: "auto", overflowX: "hidden"}}>
                            <Row>
                                <Col>
                                    <h4 className="text-center">Your path</h4> 
                                    <ListGroup>
                                        {userPath.map((e) => (
                                        <ListGroup.Item> 
                                            <h6>
                                                {(e instanceof Movie) ? <BiMovie style={{color:"black", marginRight:"20px"}}/> 
                                                    : <FaTheaterMasks style={{color:"black", marginRight:"20px"}}/> }
                                                {e.name}
                                            </h6>
                                        </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>

                                <Col>
                                <h4 className="text-center">Optimal path</h4>
                                <ListGroup>
                                        {solution.map((e) => (
                                        <ListGroup.Item> 
                                            <h6>
                                                {(e instanceof Movie) ? <BiMovie style={{color:"black", marginRight:"20px"}}/> 
                                                    : <FaTheaterMasks style={{color:"black", marginRight:"20px"}}/> }
                                                {e.name}
                                            </h6>
                                        </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    </Card>
            </Container>   
        </Container>
    )
}



