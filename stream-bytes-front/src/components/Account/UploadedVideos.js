import React, { useState, useEffect } from 'react';
import divStyles from '../../styles/div.module.css';
import imageStyles from '../../styles/image.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import VideoCard from '../VideoCard/VideoCard';

import user from '../../styles/scarface.4.jpeg';
import { getUserData } from '../../helpers/RequestHelper'
import UploadedVideoCard from '../UploadedVideoCard/UploadedVideoCard';

export default function UploadedVideos() {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        async function getUploadedVideos() {
            const result = await getUserData();
            setResponse(result.videos);
            console.log("fetched video data is ", result);
        };
        getUploadedVideos();
    }, [])

    return (
        <div>
            

            <div id='yourVideosDiv'>
                <h5>Your videos</h5>
                <Row xs={1} md={2} lg={3} xl={3}>
                    {/* {console.log(response)}; */}
                    {response ? response.map((video) => (
                        <UploadedVideoCard key={video._id} video={video}/>
                        // <Col>
                        //     <Card>
                        //         <img src={`http://localhost:4000/sendimage/${video.thumbLocation}`} className={imageStyles.videoThumbnail}></img>
                        //         <p>{video.title}</p>
                        //     </Card>
                        // </Col>
                    )) : null}
                </Row>
            </div>
            <div>
            </div>
        </div>
    )
}