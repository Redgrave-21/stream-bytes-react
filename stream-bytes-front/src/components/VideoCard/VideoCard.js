import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import divStyles from '../../styles/divStyles.module.css';
import imageStyles from '../../styles/images.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
// temp
import profile from '../../temp/scarface.3.jpeg'


export default function VideoCard({ video }) {
    // console.log(video.videoId);
    let navigate = useNavigate();
    // let videoId=video.videoId;

    function gotoVideoPlayer(event, videoId) {
        console.log("clicked");
        console.log(videoId)
        navigate(`/watch/${videoId}`);
    }

    return (
        <Container fluid>
            <Card className={divStyles.card} onClick={(e) => gotoVideoPlayer(e, video.videoId)}>
                <Card.Img className={imageStyles.videoThumbnail} src={`http://localhost:4000/sendimage/${video.thumbnailUrl}`} alt='video image'></Card.Img>
                <Card.Body className={divStyles.cardBody}>
                    <Row className={divStyles.row}>
                        <Col className={divStyles.profileCol} xs={1}>
                            <img className={imageStyles.profileThumb} src={profile}></img>
                        </Col>
                        <Col>
                            <div className={divStyles.titleDiv}>
                                <p>{video.title}</p>
                                <span>{video.author}</span>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container >
    )
}