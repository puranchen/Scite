import React, { useState, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import { Form, Container, Button } from 'react-bootstrap';
import UserContext from '../context/UserContext.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/user/token/', {
                username: email, password
            });

            const userData = {
                email: email,
                id: response.data.user_id
            }

            console.log("Logged in:", response.data);
            setCurrentUser(userData)
            navigate('/feed');

        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <Container fluid className="bg-dark vh-100 vw-100">
            <Header />
            <Container className="d-flex w-50 h-50 p-3 mx-auto flex-column justify-content-center align-items-center text-white text-center">
                <h1 className='h3'>Please sign in</h1>
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
                    <Button type="submit">Let's Foggin Go!</Button>
                </Form>
            </Container>
        </Container>
    );
}

export default Login;
