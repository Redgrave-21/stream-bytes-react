import useSWR from 'swr';
import { getUserData } from '../Request-helper/RequestHelper';
import UploadedVideoCard from './UploadedVideoCard';

const UploadedVideos = ({ uploadedVideos }) => {

    if (uploadedVideos) {
        { console.log(uploadedVideos) }
        return (
            <div className='container-fluid'>
                <h5>Your videos</h5>
                <div className="accordion">
                    <div className="row row-cols-md-2 row-cols-lg-3 g-4">
                        {uploadedVideos.map((video) => (
                            // console.log(video)
                            <div key={video._id} className='col-gap-3'>
                                <UploadedVideoCard video={video} />
                            </div>
                        ))}
                        {/* {uploadedVideos ? uploadedVideos.videos.map((video) => (
                        <UploadedVideos key={video._id} video={video} />
                    )) : "you do not have any videos yet"} */}
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadedVideos