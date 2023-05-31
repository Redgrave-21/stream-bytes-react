import React from 'react';
import VideoJS from '../components/VideoJS/VideoJS';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import divStyles from '../styles/div.module.css'
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import imageStyles from '../styles/image.module.css';
import profile from '../styles/scarface.4.jpeg';
import Comments from '../components/Comments/Comments'
import SimilarContent from '../components/Similar-content/SimilarContent';
import { useParams } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import { getVideoDataForPlayerPage } from '../helpers/RequestHelper';


import axios from 'axios';
import AddCommentForm from '../components/Forms/AddCommentForm';

export default function VideoPlayerPage() {
    const { videoId } = useParams();
    console.log("video id is ", videoId);
    const playerRef = React.useRef(null);

    const [videoData, setVideoData] = React.useState(null);

    React.useEffect(() => {
        async function getVideoData() {
            const result = await getVideoDataForPlayerPage(videoId)
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
            src: `http://localhost:4000/watch/${videoId}`,
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
                                <div className={divStyles.titleDiv}>
                                    <div>
                                        <h4><p>{videoData ? videoData.title : "video title"}</p></h4>
                                        <Row className={divStyles.videoStats}>
                                            <Col className={divStyles.videoPlayerViews}>
                                                Views: {videoData ? videoData.views : '0'}
                                            </Col>
                                            <Col className={divStyles.videoPlayerLikesDislikes} xs lg={2}>
                                                <AiFillLike />
                                                Likes: {videoData ? videoData.likes.length : '0'}
                                                {console.log("likes for this video", videoData ? videoData.likes.length : '0')}
                                            </Col>
                                            <Col className={divStyles.videoPlayerDislikeDiv} xs lg={2}>
                                                <AiFillDislike />
                                                Dislikes:{videoData ? videoData.dislikes.length : '0'}
                                                {console.log("dislikes for this video", videoData ? videoData.dislikes.length : '0')}
                                            </Col>
                                            <hr />
                                        </Row>
                                    </div>
                                    <Row>
                                        <Accordion flush>
                                            <Accordion.Header>
                                                <div className={divStyles.creatorDiv}>
                                                    <div>
                                                        <Row>
                                                            <Col className={divStyles.profileCol} xs={1}>
                                                                <img className={imageStyles.profileThumbVideoPage} src={profile} />
                                                            </Col>
                                                            <Col>
                                                                <p>{videoData ? videoData.author : "video Author"}</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className={divStyles.creatorDivPara}>
                                                    <p>{videoData ? videoData.description : "Video Description   "}</p>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        <AddCommentForm videoId={videoId} />
                        <hr />
                        <Comments videoId={videoId} />
                    </Col>
                    <Col md={5} lg={4}>
                        <SimilarContent />
                    </Col>
                </Row>
            </div>
        </Container>
    );
}