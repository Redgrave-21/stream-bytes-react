import React from 'react';
import { useEffect, useState, useContext } from 'react';
// import '../styles/index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VideoCard from '../components/VideoCard/VideoCard';
import { getIndexPageVideos } from '../helpers/RequestHelper';
import { AuthContext } from '../contexts/AuthContext';
import { TickerTape } from 'react-ts-tradingview-widgets';

export default function IndexPage() {
    // declare state for index video data
    const [videoResponse, setVideosResponse] = useState(null);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        async function getIndexVideos() {
            const videos = await getIndexPageVideos();
            setVideosResponse(videos);
        }
        getIndexVideos();
    }, [])


    return (
        <>
            <TickerTape colorTheme='dark'></TickerTape>
            <Container fluid>
                <Row xs={1} md={2} lg={3} xl={3}>
                    {videoResponse ? videoResponse.map((videoItem) => (
                        <Col key={videoItem._id}>
                            <VideoCard video={{ videoId: videoItem._id, title: videoItem.title, author: videoItem.author, thumbnailUrl: videoItem.thumbLocation }} />
                        </Col>
                    )) : null}
                </Row>
            </Container>
        </>
    )
}