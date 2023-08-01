import React from 'react';
import VideoJS from '../components/VideoJS/VideoJS';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import divStyles from '../styles/div.module.css'
import Container from 'react-bootstrap/Container';
import Comments from '../components/Comments/Comments'
import SimilarContent from '../components/Similar-content/SimilarContent';
import { useParams } from 'react-router-dom';
import { getVideoDataForPlayerPage } from '../helpers/RequestHelper';
import Button from 'react-bootstrap/Button';


import axios from 'axios';
import AddCommentForm from '../components/Forms/AddCommentForm';
import VideoTitleDiv from '../components/VideoPlayerPage/VideoTitleDIv';

export default function VideoPlayerPage() {
    const { videoID } = useParams();
    console.log("video id is ", videoID);
    const playerRef = React.useRef(null);

    const [videoData, setVideoData] = React.useState(null);

    React.useEffect(() => {
        async function getVideoData() {
            const result = await getVideoDataForPlayerPage(videoID)
            setVideoData(result)
            console.log("fetched video data is ", result)
        };
        getVideoData();
    }, [])

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            // src: 'http://192.168.1.39:4000/video'
            src: `http://localhost:4000/watch/${videoID}`,
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;
        // handle player events here

        player.on('waiting', () => {
            VideoJS.log("player is waiting");
        });

        player.on('dispose', () => {
            VideoJS.log("player will dispose")
        });
    }

    return (
        <Container fluid>
            <div className={divStyles.VideoPlayerPageRoot}>
                <Row>
                    <Col md={7} lg={8} >
                        <Row>
                            <Col>
                                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {console.log("Video data is ", videoData)}
                                <VideoTitleDiv videoData={videoData} />
                            </Col>
                        </Row>
                        <hr />
                        <AddCommentForm videoID={videoID} />
                        <hr />
                        <Comments videoID={videoID} />
                    </Col>
                    <Col md={5} lg={4}>
                        <SimilarContent />
                    </Col>
                </Row>
            </div>
        </Container>
    );
}