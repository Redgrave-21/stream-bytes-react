import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { postVideoUploadForm } from '../Request-helper/RequestHelper';

const UpdateVideoForm = () => {
    const { videoID } = useParams()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [uploadProgress, setUploadProgress] = useState(0);


    const onSubmit = data => {
        postVideoUploadForm(data, progressEvent => {
            const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progressPercentage);
        }).then(res => {
            console.log(res)
            alert("file upload successfully")
        }).catch(err => {
            console.log("error during upload", err)
        })
    }

    // const onSubmit = (videoID, data) => {
    //     postUpdateVideoForm(videoID, data)
    // }

    return (
        <div className='container fluid text-center w-50'>
            <div className='card'>
                <div className='card-body'>
                    <h5>Upload video</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row mb-3'>
                            <label htmlFor='videoTitle' className='col-sm-2 col-form-label px-1'>Video title</label>
                            <div className='col-sm-10'>
                                <input type='text' {...register('videoTitle')} className='form-control px-2'></input>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='videoDescription' className='col-sm-2 col-form-label px-1'>Video Description</label>
                            <div className='col-sm-10'>
                                <textarea name='videoDescription' {...register('videoDescription')} className='form-control px-2' ></textarea>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='file' className='col-sm-2 col-form-label px-1'>Upload video here</label>
                            <div className='col-sm-10'>
                                <input type='file' id='file'{...register('file')} className='form-control px-2'></input>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col'>
                                <button type='submit'>Upload video</button>
                                {uploadProgress ? <>
                                    <p>{uploadProgress}</p>
                                </> : null}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default UpdateVideoForm;