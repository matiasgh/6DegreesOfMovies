import React from 'react'
import { Card, Button, Row, Col, Container, Image, Alert } from "react-bootstrap"
import {Link, useHistory } from "react-router-dom"
import {useState, useEffect} from "react"
import {useAuth} from "../contexts/AuthContext"

export default function Menu() {
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState("")

    
    function startGame(){
        history.push("/game")
    }


    const {currentUser, logOut} = useAuth()
    const history = useHistory()

    async function handleLogout(){
        setLoading(true)
        setError("")
        try {
            await logOut()
            history.push("/login")
        }
        catch{
            
            setError("Failed to log out")
        }
    }


    return (
            <Container fluid >  
                <Row style={{backgroundColor: "#333"}}>
                    <Button variant="secondary" className="w-25" style={{marginLeft:"150px"}}>Scoreboard</Button>
                    <Button variant="dark" className="w-25" onClick={startGame}>Start Game</Button>
                </Row>
                <Container className="mb-5" fluid style ={{maxWidth: "1000px"}}>
                    <Image align="center" src="https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-film-scene-film-background-image_190374.jpg" rounded className="w-100 mb-5 text-center" style={{height:'250px', maxWidth: "1000px"}}/>

                        Currently logged in as: {currentUser.email !== null && currentUser.email}
                    <Card >
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}   
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <Row className="align-items-center">
                                <Button onClick={handleLogout} className="w-100 mb-2 text-center" type="submit" variant="link">
                                    Log Out
                                </Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>    
                <footer>
                    <br/>
                    <hr className="mt-5"/>
                    <p className="d-flex allign-items-center justify-content-center mt-4">Copyright &copy; 2021</p>
                    <Link className="d-flex allign-items-center justify-content-center mt-4" to='/login'>About</Link>
                </footer>
            </Container>
    )
}
