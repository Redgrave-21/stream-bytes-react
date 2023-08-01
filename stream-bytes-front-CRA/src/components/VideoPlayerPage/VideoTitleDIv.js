import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';

// import Cookies from 'js-cookie';

import divStyles from '../../styles/div.module.css';
import imageStyles from '../../styles/image.module.css';
import profile from '../../styles/scarface.4.jpeg';

export default function VideoTitleDiv({ videoData }) {

    function addVideoToPlaylist(event){
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
    }

    return (
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
                    <Col className={divStyles.videoPlayerLikesDislikes} xs lg={2}>
                        <form onSubmit={addVideoToPlaylist}>
                            <Button input type='submit'>Add to playlist</Button>
                        </form>
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
    )
}