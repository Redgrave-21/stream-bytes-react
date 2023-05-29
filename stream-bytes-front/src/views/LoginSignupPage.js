import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import LoginForm from '../components/Forms/LoginForm';
import SignUpForm from '../components/Forms/SignUpForm';

export default function LoginSignupPage() {
    const [showLoginDiv, setShowLoginDiv] = React.useState(true);

    function changeCard() {
        if (showLoginDiv === true) {
            setShowLoginDiv(false);
        }
        else {
            setShowLoginDiv(true);
        }
    }
    return (
        <Container fluid>
            <Row>
                <Col>
                    {showLoginDiv ? <LoginForm /> : null}
                    {showLoginDiv === false ?
                        <SignUpForm /> : null
                    }
                    <Button onClick={changeCard}>Login instead</Button>
                </Col>
            </Row>
        </Container>
    )
}