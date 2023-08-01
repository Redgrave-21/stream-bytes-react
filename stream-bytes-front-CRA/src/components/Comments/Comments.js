import React from 'react';
import profile from '../../styles/scarface.4.jpeg';
import divStyles from '../../styles/div.module.css';
import imageStyles from '../../styles/image.module.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getVideoComments } from '../../helpers/RequestHelper';


export default function Comments({ videoId }) {
    const [comments, setComments] = React.useState(null);
    console.log("video id given from comment component", videoId)

    React.useEffect(() => {
        async function getComments() {
            const result = await getVideoComments(videoId)
            setComments(result.comments);
            console.log("fetched comment data is ", result.comments);
        }
        getComments();
    }, []);

    return (
        <Container fluid>
            <div >
                <div className={divStyles.titleDiv}>
                    <div>
                        <h4>Comments</h4>
                    </div>
                </div>
                <ul className={divStyles.commentList}>
                    {comments ? console.log(comments) : console.log("there are no comments")}
                    {comments ? comments.map((comment) => (
                        <li key={comment._id}>
                            <Card className={divStyles.commentCard}>
                                <div>
                                    <span className={divStyles.profileCol}>
                                        <Row>
                                            <Col xs={1}>
                                                <img className={imageStyles.profileThumb} src={profile} />
                                            </Col>
                                            <Col>
                                                <div className={divStyles.commentAuthor}>
                                                    <p>{comment.author} </p>
                                                </div>
                                                <span className={divStyles.commentText}>
                                                    {comment ? comment.text : "comments should go here"}
                                                </span>
                                            </Col>

                                        </Row>
                                    </span>
                                </div>
                            </Card> 
                        </li>
                    )) : null}
                </ul>
            </div>
        </Container>
    )
}