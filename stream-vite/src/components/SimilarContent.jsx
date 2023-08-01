
import video from '../styles/scarface.4.jpeg';

const SimilarContent = () => {
    return(
        <div>
            <ul>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col col-1">
                                <img width={'150px'} height={'100px'} src={video}></img>
                            </div>
                            <div className='col'>
                                <p>{video.title}</p>
                                <span> video author</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    )
}

export default SimilarContent;