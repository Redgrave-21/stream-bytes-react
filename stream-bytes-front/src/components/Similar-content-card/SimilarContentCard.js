import React from'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import divStyles from '../../styles/divStyles.module.css';
import imageStyles from '../../styles/images.module.css';

// temp
import video from '../../styles/scarface.4.jpeg';

export default function SimilarContentCard() {
    return (
        <Container fluid>
            <Card>
                <Card.Body className={divStyles.cardBody}>
                    <Row className={divStyles.row}>
                        <Col className={divStyles.profileCol} xs={1}>
                            <img className={imageStyles.similarVideoThumb} width={'150px'} height={'100px'} src={video}></img>
                        </Col>
                        <Col>
                            <div className={divStyles.titleDiv}>
                                <p>{video.title}</p>
                                <span>video author</span>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}