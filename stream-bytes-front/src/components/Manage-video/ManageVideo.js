import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { getVideoDataForPlayerPage } from '../../helpers/RequestHelper';
import { useContext, useEffect } from 'react';
import { ManageVideoContext } from '../../contexts/ManageVideoContext';
import { postUpdateVideoForm } from '../../helpers/RequestHelper';
import formStyles from '../../styles/form.module.css';

export default function ManageVideo() {

    const [existingVideoData, setExistingVideoData] = useContext(ManageVideoContext);


    const { videoID } = useParams();
    useEffect(() => {
        async function fetchVideoData() {
            const result = await getVideoDataForPlayerPage(videoID);
            setExistingVideoData({ videoID: result._id, title: result.title, description: result.description });
            console.log("viedo result from manageVideo page", result)
            console.log("video state form manageVideo page", existingVideoData);
        }
        fetchVideoData();

    }, [])

    async function submitUpdateVideoForm(event) {
        event.preventDefault();
        const videoID = existingVideoData.videoID;
        console.log(videoID);
        const formData = new FormData(event.target);
        // console.log("formdata is ", Object.fromEntries(formData));
        const actualFormData = Object.fromEntries(formData);
        await postUpdateVideoForm(videoID, actualFormData).then(
            (res)=>{
                console.log("response from postUpdateVideoForm", res);
                console.log("response status is ", res.status);
                console.log("response data is ", res.data);
            }
        )
    }

    function handleTitleInput(event) {
        setExistingVideoData({ title: event.target.value });
    }

    function handleDescriptionInput(event) {
        setExistingVideoData({ description: event.target.value });
    }

    return (
        <Container fluid>
            <div>
                <div className={formStyles.formDiv}>
                    <h5>Update existing video </h5>
                    <form onSubmit={submitUpdateVideoForm}>
                        <div>
                            {/* <input type="hidden" name="videoID" value={existingVideoData.videoID} /> */}
                        </div>
                        <div className={formStyles.formElement}>
                            <label htmlFor="videoTitle" name="videoTitle" classname={formStyles.formElementLabel}> add new video title here</label>
                            <input type="text" placeholder="video title" value={existingVideoData.title} name="videoTitle" onChange={handleTitleInput} className={formStyles.formElementInput}></input>
                        </div>

                        <div className={formStyles.formElement}>
                            <label htmlFor='videoDescription' className={formStyles.formElementLabel}>
                                Video Description
                            </label>
                            <textarea name='videoDescription' placeholder="video description" value={existingVideoData.description} onChange={handleDescriptionInput} className={formStyles.formElementInput}></textarea>
                        </div>

                        <div>
                            <Button className={formStyles.resetNewCommentButton}>Cancel</Button>
                            <Button input type='submit' className={formStyles.addNewCommentButton}> Update</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}