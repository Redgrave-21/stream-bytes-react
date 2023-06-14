import React, { useState, useEffect, useContext } from 'react';
import divStyles from '../../styles/div.module.css';
import imageStyles from '../../styles/image.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import user from '../../styles/scarface.4.jpeg';
import { getUserData } from '../../helpers/RequestHelper'
import UploadedVideos from './UploadedVideos';
import Library from './Library';
import { AuthContext } from '../../contexts/AuthContext';

const userName = "Redgrave";
export default function AccountHome() {
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
    const [response, setResponse] = useState({ _id: '', userName: '', videos: [], playlist: [] });

    useEffect(() => {
        const isAuthenticatedObject = isAuthenticated;
        // console.log("UID from isAuthenticatedObject ", isAuthenticatedObject);
        // if ((isAuthenticatedObject) && (isAuthenticatedObject.UID != '')) {
        async function getUserPageData() {
            const result = await getUserData();
            console.log("response for getuserdata is ", result);
            setResponse({ _id: result._id, userName: result.userName, videos: result.videos, playlist: result.playlist });
            // console.log("fetched user data is ", response);
        };
        getUserPageData();

    }, [])

    return (
        <>
            {isAuthenticated.UID ?
                <div>
                    {console.log(response)}
                    <div className={divStyles.AccountHomeDiv}>
                        <h5><img className={imageStyles.profileThumbHome} src={user} />
                            Welcome {response.userName}
                        </h5>
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