import React from "react";
import Header from "../components/Header.js";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    return (
        <Container fluid className="bg-dark vh-100 vw-100">
            <Header />
            <Container className="d-flex w-50 h-50 p-3 mx-auto flex-column justify-content-center align-items-center text-white text-center">
                <h1>About Scite</h1>
                <p>Welcome to Scite, where the lovechild of PubMed, TikTok, and a mysterious unidentified underground forum had too much caffeine and started coding. Enjoy!</p>
                <p>Contributions and unsolicited advice are not just welcome; they're desperately needed.</p>
                <Button variant="light" className="fw-bold" href="mailto:puran.chen@ki.se">Be A Hero</Button>
            </Container>
        </Container>
    );
};

export default About;