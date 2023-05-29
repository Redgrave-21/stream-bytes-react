import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import '../styles/index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import VideoCard from '../components/VideoCard/VideoCard';

export default function IndexPage() {
    const [videoResponse, setVideosResponse] = useState(null);

    useEffect(() => {
        async function getVideos() {
            const result = await axios.get('http://localhost:4000/');
            setVideosResponse(result.data)
            console.log(result)
        };
        getVideos();
    }, [])

    return (<Container fluid>
        <Row xs={1} md={2} lg={3} xl={3}>
            {videoResponse ? videoResponse.map((videoItem) => (
                <Col key={videoItem._id}>
                    <VideoCard video={{ videoId: videoItem._id, title: videoItem.title, author: videoItem.author, thumbnailUrl: videoItem.thumbLocation }} />
                </Col>
            )) : null}
        </Row>
    </Container>
    )
}