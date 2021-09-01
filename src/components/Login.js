import { useRef, useState } from 'react'
import { Button, Card, Form, Alert, Row, Col } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import {Link, useHistory } from "react-router-dom"

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()

    // A state over errors to easily render correct feedback to user when an error occurs
    const [error, setError] = useState("")
    // A switch for disabling signin button to make sure that multiple signup requests wont happen when clicking button more than once
    const [loading, setLoading] = useState(false)

    const history = useHistory()

   
    // Signs up user with signup from AuthContext
    async function handleSubmit(e){
        e.preventDefault()
        
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        }
        catch{
            setError("Failed to sign in")
        }
        setLoading(false)
    }


    return (
        <>  
            <br/><br/><br/>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-5">Log In</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group id="email" controlId="formEmail" className="mb-4">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="example@email.com" ref={emailRef} required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group id="password" className="mb-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="*******" ref={passwordRef} required/>
                                </Form.Group>
                            </Col>

                        </Row>
                        <Button disabled={loading} className="w-100 mt-5" type="submit" variant="primary">
                            Log in
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <h1 className="text-center mb-5"/>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/Signup">Sign In</Link>
            </div>
        </>
    )
}
