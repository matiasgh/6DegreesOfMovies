import { useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"


export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()

    // A state over errors to easily render correct feedback to user when an error occurs
    const [error, setError] = useState("")
    // A switch for disabling signup button to make sure that multiple signup requests wont happen when clicking button more than once
    const [loading, setLoading] = useState(false)
    

    const history = useHistory()
   
    // Signs up user with signup from AuthContext
    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Password do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")

        }
        catch{
            setError("Failed to create an account")
        }
        setLoading(false)
    }


    return (
        <>  
            <br/><br/><br/>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-5">Sign Up</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" controlId="formEmail" className="mb-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="example@email.com" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password" className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mb-4">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-5" type="submit" variant="primary">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-5">
                Already have an account? <Link to="/Login">Log In</Link>
            </div>
        </>
    )
}
