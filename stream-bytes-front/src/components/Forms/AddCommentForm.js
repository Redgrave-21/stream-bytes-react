import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import formStyles from '../../styles/form.module.css';
import { postNewCommentForm } from '../../helpers/RequestHelper';


export default function AddCommentForm({ videoId }) {

    // submit comment form function
    const submitCommentForm = (event) => {
        event.preventDefault();
        const form = event.target;
        console.log(form)
        const formData = new FormData(form);

        // better rename this to urlencoded form later
        //seperate out all the requests into a seperate context
        const actualFormData = Object.fromEntries(formData.entries());
        console.log("comment form data is", actualFormData);
        postNewCommentForm(videoId,actualFormData);

    }

    return (
        <Container fluid>
            {console.log("video Id as it appeared in commentForm", videoId)}
            <div>
                <form onSubmit={submitCommentForm}>
                    <div className={formStyles.addCommentFormDiv}>
                        <div className={formStyles.addCommentFormLabel}>
                            <label htmlFor='commentText'>add comment</label>
                        </div>
                        <Row>
                            <input type='hidden' id='videoId' name='videoId' value={videoId}></input>
                        </Row>
                        <Row className={formStyles.addCommentFormInput}>
                            <input type='text' placeholder='Add a comment...' name='commentText'></input>
                        </Row>
                    </div>
                    <Row className={formStyles.addCommentFormButtons}>
                        <Col>
                            <Button className={formStyles.resetNewCommentButton}>Cancel</Button>

                            <Button input type='submit' className={formStyles.addNewCommentButton}>comment</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        </Container>
    )
}