import { useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"


export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const userNameRef = useRef()
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

        if(userNameRef.current.value > 15){
            return setError("Username to long!")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, userNameRef.current.value)
            history.push("/")

        }
        catch{
            setError("Failed to create an account. Make sure your password is atleast 6 characters long.")
        }
        setLoading(false)
    }


    return (
        <>  
            <br/><br/><br/>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-4">Sign Up</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" controlId="formEmail" className="mb-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="example@email.com" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="username" className="mb-4">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="ingame username" ref={userNameRef} required/>
                        </Form.Group>
                        <Form.Group id="password" className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="********" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mb-4">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" placeholder="********" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit" variant="primary">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-4 mb-3">
                Already have an account? <Link to="/Login">Log In</Link>
            </div>
        </>
    )
}
