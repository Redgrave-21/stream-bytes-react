import { useNavigate } from 'react-router-dom'
import '../styles/VideoCard.css'

const UploadedVideoCard = ({ video }) => {
    const Navigate = useNavigate()
    const gotoManageVideo = (e, videoID) => {
        e.preventDefault()
        console.log("video to edit id is", videoID)
        Navigate(`/account/manage-video/${videoID}`)
    }

    return (
        <div className='card video-card'>
            <img className="card-img-top" src={`http://localhost:4000/sendimage/${video.thumbLocation}`} width={300} height={200}></img>
            <div className='card-body'>
                <div className='card-text'>
                    <div className='row'>
                        <div className='col'>
                            <p className='text-truncate mb-1'>{video.title}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Like:{video.likes.length}
                        </div>
                        <div className="col">
                            Dislikes:{video.dislikes.length}
                        </div>
                        <div className="col">
                            Views:{video.views}
                        </div>
                    </div>
                    <div>
                        <button onClick={(e) => gotoManageVideo(e, video._id)}>Manage video</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadedVideoCard