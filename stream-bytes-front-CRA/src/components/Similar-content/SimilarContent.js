import React from'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SimilarContentCard from "../Similar-content-card/SimilarContentCard";
import divStyles from '../../styles/div.module.css'
export default function () {
    return (
        <Container fluid>
            <Row>
                    <ul className={divStyles.similarContentContainer}>
                        <SimilarContentCard />
                    </ul>
            </Row>
        </Container>
    )
}