/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import profile from '../assets/face-off.jpg'
import '../styles/VideoCard.css'


const VideoCard = ({ video }) => {
    const navigate = useNavigate();
    const gotoVideoPlayer = (event, videoId) => {
        console.log(videoId)
        navigate(`watch/${videoId}`)
    }

    if (video) {
        console.log(video)
        return (
            <div className='card video-card' onClick={(event) => gotoVideoPlayer(event, video._id)}>
                <img className='card-img-top' src={`http://localhost:4000/sendimage/${video.thumbLocation}`}></img>
                <div className='card-body'>
                    <div className='card-text'>
                        <div className='row'>
                            {/* <div className='col-3 pe-0'>
                                <img className='profile' src={profile}></img>
                            </div> */}
                            <div className='video-info col-9 ps-0 pe-0'>
                                <p className='text-truncate mb-1'>{video.title}</p>
                                <p className='text-truncate mb-1'>{video.author.userName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoCard