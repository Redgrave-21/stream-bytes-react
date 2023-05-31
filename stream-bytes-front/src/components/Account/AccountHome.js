import React from 'react';
import divStyles from '../../styles/div.module.css';
import imageStyles from '../../styles/image.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import user from '../../styles/scarface.4.jpeg';

const userName = "Redgrave";
export default function AccountHome() {
    return (
        <div>
            <div className={divStyles.AccountHomeDiv}>
                <h5><img className={imageStyles.profileThumbHome} src={user} />
                    Welcome {userName}</h5>
            </div>

            <div id='yourVideosDiv'>
                <h5>Your videos</h5>
                <Row xs={1} md={2} lg={3} xl={3}>
                    <Col>
                    <Card>
                        <img src={user} className={imageStyles.videoThumbnail}></img>
                    </Card>
                    </Col>
                </Row>
            </div>
           <div>
           </div>
        </div>
    )
}