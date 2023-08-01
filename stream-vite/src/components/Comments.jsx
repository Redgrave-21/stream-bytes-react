import useSWR from 'swr';
import { getVideoComments } from '../Request-helper/RequestHelper';

const Comments = ({ videoId }) => {
    const { data, error, loading } = useSWR(`http://localhost:4000/video/${videoId}/comments`, getVideoComments);
    if (error) {
        return "error loading data"
    }
    if (loading) {
        return <div>Loading</div>
    }
    if (data) {
        return (
            <div>
                {console.log(data.comments.comments)}
                <h4>Comments</h4>
                <list style={{ listStyleType: "none" }}>
                    {(data.comments.comments && data.comments.length != 0) ? data.comments.comments.map((comment) => (
                        <li key={comment._id}>
                            <div className='card'>
                                <div className='card-body'>
                                    <p>{comment.text}</p>
                                    <p className='text-body-secondary'>{comment.author}</p>
                                </div>
                            </div>
                        </li>
                    )) : "no comments yet be the first one to comment"}
                </list>
            </div>
        )
    }

}

export default Comments