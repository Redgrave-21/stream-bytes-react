import React from 'react';
import profile from '../../styles/scarface.4.jpeg';
import divStyles from '../../styles/divStyles.module.css';
import imageStyles from '../../styles/images.module.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';


export default function Comments({ videoId }) {
    const [comments, setComments] = React.useState(null);
    console.log("video id given from comment component", videoId)

    React.useEffect(() => {
        async function getComments() {
            const commentsResult = await axios.get(`http://localhost:4000/video/${videoId}/comments`)
            setComments(commentsResult.data.comments);
            console.log("fetched comment data is ", commentsResult.data.comments);
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
                            <Card>
                                <div>
                                    <span className={divStyles.profileCol}>
                                        <Row>
                                            <Col xs={1}>
                                                <img className={imageStyles.profileThumb} src={profile} />
                                            </Col>
                                            <Col>
                                                <p>{comment.author} </p>
                                                <span>
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