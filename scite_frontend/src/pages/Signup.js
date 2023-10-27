import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import { Form, Container, Button } from 'react-bootstrap';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log("Password do not match");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/user/signup/', {
                email, password, password2: confirmPassword
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <Container fluid className="bg-dark vh-100 vw-100">
            <Header />
            <Container className="d-flex w-50 h-50 p-3 mx-auto flex-column justify-content-center align-items-center text-white text-center">
                <h1 className='h3'>Sign Up</h1>
                <Form className='form-signin w-50' onSubmit={handleSubmit}>
                    <Form.Group controlId="floatingInputEmail" className="form-floating m-3">
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Label className="text-dark">Email address</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="floatingInputPassword" className="form-floating m-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Label className="text-dark">Password</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="floatingConfirmPassword" className="form-floating m-3">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Form.Label className="text-dark">Confirm Password</Form.Label>
                    </Form.Group>
                    <Button type="submit">Join!</Button>
                </Form>
            </Container>
        </Container>
    );
}

export default Signup;
