import React, { useState, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import formStyles from '../../styles/form.module.css';

// import { AuthContextProvider } from '../../contexts/AuthContext';
import { postVideoUploadForm } from '../../helpers/RequestHelper';

export default function UploadVideoForm() {
    // const isAuthenticated = useContext(AuthContextProvider);
    const [returnedResponseState, setReturnedResponseState] = useState({
        status: 0,
        text: ''
    });

    //show or unshow upload form


    async function submitUploadVideoForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        console.log(formData);
        const actualFormData = Object.fromEntries(formData.entries());
        // console.log(actualFormData);
        await postVideoUploadForm(actualFormData).then(
            (res) => {
                console.log(res);
                if (!res) {

                }
                else {
                    setReturnedResponseState({ status: res.status, text: res.data }, () => {
                        console.log(returnedResponseState);
                    });
                }
            }
        )
    }
    return (
        <div>
            <div className={formStyles.formDiv} id="uploadVideoFormDiv">
            <h5>Upload new Video</h5>
            <div>
                {returnedResponseState ? returnedResponseState.text : null}
            </div>
            <form onSubmit={submitUploadVideoForm} encType="multipart/form-data">
                <div className={formStyles.formElement}>
                    <label htmlFor='videoTitle' className={formStyles.formElementLabel}>Video title</label>
                    <input type='text' name='videoTitle' className={formStyles.formElementInput}></input>
                    {/* <div>
                                <input type='hidden' id='videoId' name='videoId' value={videoId}></input>
                            </div> */}
                </div>
                <div className={formStyles.formElement}>
                    <label htmlFor='videoDescriptionText' className={formStyles.formElementLabel}>Video Description</label>
                    <textarea name='videoDescriptionText' className={formStyles.formElementInput} id='videoDescriptionInput'></textarea>
                </div>
                <div className={formStyles.formElement}>
                    <label htmlFor='videoInput' className={formStyles.formElementLabel}>Upload video here</label>
                    <input type='file' name='videoInput' className={formStyles.formElementInput}></input>
                </div>
                <div >
                    <Button className={formStyles.resetNewCommentButton}>Cancel</Button>

                    <Button input type='submit' className={formStyles.addNewCommentButton}>comment</Button>
                </div>
            </form>
        </div>
        </div>
    )
}