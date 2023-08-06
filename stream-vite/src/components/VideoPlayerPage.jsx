import { useRef, useContext } from 'react';
import useSWR from 'swr';
import { getVideoDataForPlayerPage } from '../Request-helper/RequestHelper';
import VideoJs from './VideoJs';
import { useParams } from 'react-router-dom';
import VideoTitleSection from './VideoTitleSection';
import AddCommentForm from './AddCommentForm';
import Comments from './Comments';
import videojs from 'video.js';
// import style from '../styles/video.css'
import useAuthStore from './Context/AuthContext';

const VideoPlayerPage = () => {
    const { videoId } = useParams()

    const [loggedIn] = useAuthStore((state) => [state.loggedIn])
    
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        // responseive: true,
        fluid: true,
        aspectRatio: '16:9',
        sources: [{
            src: `http://localhost:4000/watch/${videoId}`,
            type: 'video/mp4'
        }]
    }

    const playerRef = useRef(null);

    const handlePlayerReady = (player) => {
        playerRef.current = player;
        // handle player events here

        player.on('waiting', () => {
            videojs.log("player is waiting");
        });

        player.on('dispose', () => {
            videojs.log("player will dispose")
        });
    }
    const { data, error, loading } = useSWR(`http://localhost:4000/video/${videoId}/data`, getVideoDataForPlayerPage);
    if (error) {
        return "error loading data"
    }
    if (loading) {
        return <div>Loading</div>
    }
    if (data) {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <VideoJs options={videoJsOptions} />
                    </div>
                    <div className='col'>
                        <VideoTitleSection videoData={{ id: data.videoData._id, title: data.videoData.title, author: data.videoData.author, description: data.videoData.description, views: data.videoData.views, likes: data.videoData.likes, dislikes: data.videoData.dislikes }} />
                    </div>
                </div>
                <div className='row'>
                </div>
                <div className='row'>
                    <hr />
                    {console.log(loggedIn)}
                    {loggedIn ?
                        <AddCommentForm videoId={data.videoData._id} />
                        : "You must be logged in to comment"}
                </div>
                <div className='row'>
                    <hr />
                    <Comments videoId={data.videoData._id} />
                </div>
            </div>
        )
    }
}

export default VideoPlayerPage;