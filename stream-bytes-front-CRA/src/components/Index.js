import React from 'react';
import { useEffect, useState, useContext } from 'react';
// import '../styles/index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VideoCard from '../components/VideoCard/VideoCard';
import { getIndexPageVideos } from '../helpers/RequestHelper';

export default function Index() {
    // declare state for index video data
    const [videoResponse, setVideosResponse] = useState(null);

    useEffect(() => {
        async function getIndexVideos(){
            const videos = await getIndexPageVideos();
            // console.log(videos)
            setVideosResponse(videos);
        }
        getIndexVideos();
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