import React, { useState, useEffect } from 'react';
import divStyles from '../../styles/div.module.css';
import imageStyles from '../../styles/image.module.css';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
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
                <Accordion>
                    <Row xs={1} md={2} lg={3} xl={3}>
                        {/* {console.log(response)}; */}
                        {response ? response.map((video) => (
                            <UploadedVideoCard key={video._id} video={video} />
                           
                        )) : null}
                    </Row>
                </Accordion>
            </div>
            <div>
            </div>
        </div>
    )
}