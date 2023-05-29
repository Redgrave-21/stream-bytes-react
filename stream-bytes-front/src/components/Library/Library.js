import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Library() {
    return (
        <Container>
            <h5>Your Playlists</h5>
            <Row>
                <Col>
                    <Card>
                        <h6>Your playlist name</h6>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}