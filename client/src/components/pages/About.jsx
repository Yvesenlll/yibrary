import React from 'react';
import { Container } from 'react-bootstrap';

function About() {
    return(
        <Container className = "my-5">
            <header className = "jumbotron">
                <h1>ALL ABOUT ME</h1>
            </header>

            <div>
                <p>The Library of Yvesen!</p>
            </div>
        </Container>
    )
}

export default About;
