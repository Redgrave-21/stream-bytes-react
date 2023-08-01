import React, { useState, useEffect, useContext } from 'react';
import divStyles from '../../styles/div.module.css';
import imageStyles from '../../styles/image.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import user from '../../styles/scarface.4.jpeg';
import { getUserData } from '../../helpers/RequestHelper'
import UploadedVideos from './UploadedVideos';
import Library from './Library';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const userName = "Redgrave";
export default function AccountHome() {
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
    const [response, setResponse] = useState({ _id: '', userName: '', videos: [], playlist: [] });
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticatedObject = isAuthenticated;
        // console.log("UID from isAuthenticatedObject ", isAuthenticatedObject);
        // if ((isAuthenticatedObject) && (isAuthenticatedObject.UID != '')) {
        async function getUserPageData() {
            console.log("isAuthenticated object is ",isAuthenticatedObject)
            const result = await getUserData();
            console.log("response for getuserdata is ", result);
            setResponse({ _id: result._id, userName: result.userName, videos: result.videos, playlist: result.playlist });
            // console.log("fetched user data is ", response);
        };
        getUserPageData();
    }, [])

    // goto settings page
    function gotoAccountSettings(event, UID){
        navigate('/account/settings/');
        
    }

    return (
        <>
            {isAuthenticated.UID ?
                <div>
                    {console.log(response)}
                    <div className={divStyles.AccountHomeDiv}>
                        <h5><img className={imageStyles.profileThumbHome} src={user} />
                            Welcome {response.userName}
                        </h5>
                        <div>
                            <Button onClick={(e) => gotoAccountSettings(e, isAuthenticated.UID)}> Settings </Button>
                        </div>
                    </div>
                    <UploadedVideos />
                    <Library />
                </div>
                :
                <div>
                    <h5>
                        You must be logged in to access Account
                    </h5>
                </div>}
        </>
    )
}