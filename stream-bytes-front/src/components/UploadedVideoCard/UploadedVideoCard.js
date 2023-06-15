import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import divStyles from '../../styles/div.module.css';
import imageStyles from '../../styles/image.module.css';
import ManageVideo from '../Manage-video/ManageVideo';


export default function UploadedVideoCard({ video }) {

    let navigate = useNavigate();

    function gotoManageVideoComponent(event, videoID) {
        console.log(videoID);
        navigate(`/account/manage-video/${videoID}`)
        // <Link to="/account/manage-video/{videoID}/>
        // Navigate to manage video componenet
    }

    return (
        <div>
            {/* <Card className={divStyles.card} onClick={(e) => gotoVideoPlayer(e, video.videoId)}> */}
            <Card className={divStyles.card}>
                {console.log("video for uploaded video card is ", video)}
                <Card.Img className={imageStyles.videoThumbnail} src={`http://localhost:4000/sendimage/${video.thumbLocation}`} alt='video image'></Card.Img>
                <Card.Body className={divStyles.cardBody}>

                    {/* vidoeo title and author */}
                    <Row className={divStyles.row}>

                        {/* video title div */}
                        <Col>
                            <div className={divStyles.titleDiv}>
                                <p>{video.title}</p>
                                <div>
                                    <Row>
                                        <Col>
                                            Total Likes:{video.likes.length}
                                        </Col>
                                        <Col>
                                            <div className='vr'> </div>
                                            Total Dislikes:{video.dislikes.length}
                                        </Col>
                                        <Col>
                                            Total Videos:{video.views}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div>
                                <Button onClick={(e) => gotoManageVideoComponent(e, video._id)}>Manage Video</Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}